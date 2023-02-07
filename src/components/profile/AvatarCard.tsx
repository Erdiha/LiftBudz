import Avatar from 'avataaars';
import { useState } from 'react';
import { db } from '@/firebase/fireBase';
import useAuth from '../../firebase/usefirebaseUI';
import { useEffect } from 'react';
import { useFetchDB } from '@/hooks/useFetch';

function AvatarCard({ setOpen }: any) {
	const { currentUser } = useAuth();
	const userID = currentUser!.uid;
	let [allAvatars, setAllAvatars]: any = useState(
		useFetchDB('avatars', undefined)
	);
	//const avatarRef: any = useRef(null);

	const handleGetAvatarCollection = async () => {
		db.collection('avatars')
			.get()
			.then(snapshot => {
				let avatars: any = [];
				snapshot.forEach((doc: any) => {
					const data = doc.data();
					avatars.push({ ...data, id: doc.id });
				});
				setAllAvatars(avatars);
				console.log(snapshot);
			})
			.catch(error => console.log(error));
	};

	useEffect(() => {
		handleGetAvatarCollection();
	}, []);

	const handleChosenAvatar = async (event: any, avatar: any) => {
		event.preventDefault();
		try {
			const usersRef = db.collection('users');
			const snapshot = await usersRef.get();
			await Promise.all(
				snapshot.docs.map((doc: any) => {
					if (doc.data().userId === userID) {
						return doc.ref.update({
							...doc.data(),
							photoURL: avatar,
						});
					}
				})
			);
		} catch (error) {
			console.error('Error saving data: ', error);
		} finally {
			setOpen(false);
		}
	};

	return (
		<div className="grid grid-cols-5 gap-2 ">
			{allAvatars?.map((avatar: any, index: number) => {
				return (
					<button
						key={avatar.id}
						className="flex justify-center items-center border p-1 md:hover:scale-[1.1] md:hover:bg-white/90 transform duration-200 ease-in-out"
						onClick={(event: any) => handleChosenAvatar(event, avatar)}
					>
						<Avatar
							key={avatar.id}
							style={{ width: '80px', height: '80px' }}
							{...avatar}
						/>
					</button>
				);
			})}
		</div>
	);
}

export default AvatarCard;

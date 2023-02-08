import Avatar from 'avataaars';

import useAuth from '@/firebase/usefirebaseUI';
import { useGetAvatar } from '../../hooks/useFetch';

function ProfileAvatar({ setOpen }: any) {
	const { currentUser } = useAuth();
	const userID = currentUser!.uid;

	const getAvatar = useGetAvatar();

	return (
		<button onClick={setOpen((prev: boolean) => !prev)} className="">
			<Avatar
				style={{ width: '100px', height: '100px' }}
				avatarStyle="Circle"
				{...getAvatar}
			/>
		</button>
	);
}

export default ProfileAvatar;

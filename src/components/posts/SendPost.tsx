import React, { useState } from 'react';
import { Button, Input, Textarea, Card } from '@material-tailwind/react';
import firebase, { db, auth } from '../../firebase/firebase';
import { GrEmoji } from 'react-icons/gr';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { serverTimestamp } from 'firebase/firestore';
import uuid from 'react-uuid';
import useFileUpload from '../../hooks/useFileUpload';
import Loading from '@/utils/Loading';
import useAuth from '@/firebase/usefirebaseUI';

function SendPost({ setOpenPostFields }: any) {
	const [postValue, setPostValue] = useState({ text: '' });
	const {currentUser} = useAuth();
	const [imageUpload, setImageUpload] = useState(null);
	const { file, downloadURL, handleButtonClick, imageLoading } =
		useFileUpload();
	const initialState = {
		title: '',
		text: '',
	};

	async function sendPost(event: any) {
		event.preventDefault();
		const { uid }: any = auth.currentUser;
		const { email }: any = auth.currentUser;

		await db.collection('posts').add({
			text: postValue.text,
			uid,
			photoURL: downloadURL,
			createdAt: serverTimestamp(),
			comments: [],
			likes: [],
			timeStamp: Date.now(),
			userEmail:email ||currentUser?.email
		});
		setPostValue(initialState);
		setOpenPostFields((prev: boolean) => !prev);
	}

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setPostValue({ ...postValue, [name]: value });
	};

	const handleCancel = () => {
		setPostValue(initialState);
		setOpenPostFields(false);
	};

	const handleClick = () => {
		handleButtonClick();
	};

	return (
		<div className="flex flex-col items-center w-full pt-6 bg-gray-100 sm:justify-center sm:pt-0">
			{
				<form onSubmit={sendPost} className="w-full p-2">
					<div className="mt-4">
						<Textarea
							required
							label="What's on your mind?"
							name="text"
							onChange={handleChange}
						/>
					</div>

					<div className="flex items-center justify-between mt-4 gap-x-2">
						{imageLoading ? (
							<Loading />
						) : (
							<div className="flex gap-2 ">
								<button
									type="submit"
									className="px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
								>
									POST
								</button>
								<button
									onClick={handleCancel}
									className="px-6 py-2 text-sm font-semibold text-gray-100 bg-gray-400 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
								>
									Cancel
								</button>
							</div>
						)}
						<div className=" flex gap-3 h-full w-fit py-2 justify-around px-10 ">
							<button
								type="button"
								className="w-10 h-8 flex justify-center items-center rounded-md shadow-md focus:border-gray-900 focus:ring ring-gray-300 bg-gray-300"
							>
								<GrEmoji className="text-black bg-yellow-500 rounded-full text-2xl " />
							</button>

							<button
								type="button"
								id="file-input"
								onClick={handleClick}
								className=" text-sm  w-10 h-8 flex justify-center items-center  rounded-md shadow-md hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
							>
								<HiOutlinePhotograph className="text-2xl" />
							</button>
						</div>
					</div>
				</form>
			}
		</div>
	);
}

export default SendPost;

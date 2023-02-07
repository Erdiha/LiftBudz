import React, { useState } from 'react';
import { Button, Input, Textarea, Card } from '@material-tailwind/react';
import firebase, { db, auth } from '@/firebase/fireBase';
import useAuth from '@/firebase/usefirebaseUI';
import { serverTimestamp } from 'firebase/firestore';
function SendPost({ setOpenPostFields }: any) {
	const [postValue, setPostValue] = useState({ title: '', text: '' });
	const initialState = {
		title: '',
		text: '',
	};
	async function sendPost(event: any) {
		event.preventDefault();
		const { uid, photoURL }: any = auth.currentUser;

		await db.collection('posts').add({
			title: postValue.title,
			text: postValue.text,
			uid,
			photoURL,
			createdAt: serverTimestamp(),
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
	return (
		<div className="flex flex-col items-center w-full pt-6 bg-gray-100 sm:justify-center sm:pt-0">
			<form onSubmit={sendPost} className="w-full p-2">
				<div>
					<Input
						type="text"
						name="title"
						label="title"
						aria-label="title"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mt-4">
					<Textarea
						required
						label=" Description"
						name="text"
						onChange={handleChange}
					/>
				</div>

				<div className="flex items-center justify-start mt-4 gap-x-2">
					<button
						type="submit"
						className="px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
					>
						Update
					</button>
					<button
						onClick={handleCancel}
						className="px-6 py-2 text-sm font-semibold text-gray-100 bg-gray-400 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default SendPost;

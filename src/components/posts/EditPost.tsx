import { Fragment, useState } from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
} from '@material-tailwind/react';
import { RiEdit2Fill } from 'react-icons/ri';
import { AiTwotoneDelete } from 'react-icons/ai';
import { auth, db } from '@/firebase/firebase';
import { IPost } from './types';
import { useDelete } from '@/hooks/useDelete';
import React from 'react';
import { toast } from 'react-toastify';

export default function EditPost({ post }: { post: IPost }) {
	const { deleteItem, dLoading, dError } = useDelete();
	const [open, setOpen] = useState(false);
	const [postValue, setPostValue] = useState(post.text);

	const handleOpen = () => setOpen(!open);

	const handleDelete = () => {
		deleteItem(post.id, 'posts');
		if (dLoading) {
			toast('Loading!');
		} else if (dError) {
			toast('Error deleting!');
		} else {
			toast('Post deleted successfully!');
		}
		setOpen(false);
	};

	async function sendPost(event: any) {
		event.preventDefault();
		const p: IPost = {
			id: post?.id,
			text: postValue,
			uid: post?.uid,
			photoURL: post?.photoURL,
			createdAt: post.createdAt,
			comments: post?.comments,
			likes: post?.likes,
			timeStamp: post?.timeStamp,
		};

		const usersRef = db.collection('posts');
		const snapshot = await usersRef.get();

		await Promise.all(
			snapshot.docs.map(async doc => {
				if (doc.id === post.id) {
					await doc.ref.update({ ...p });
				}
			})
		)
			.catch(error => {
				toast('Error Creating Post!');
				console.log(error);
			})
			.finally(() => {
				toast('Post updated successfully!');
				setOpen(false);
			});
	}

	return (
		<Fragment>
			<button
				className="edit-button flex p-2 font-semibold items-center text-gray-800 bg-gray-100 rounded-full shadow-md hover:bg-gray-200 focus:outline-none focus:border-gray-900 focus:ring ring-gray-100 text-sm"
				onClick={handleOpen}
			>
				<RiEdit2Fill />
			</button>
			{open && (
				<Dialog
					open={open}
					handler={() => handleDelete}
					className="flex flex-col"
				>
					<span
						onClick={handleDelete}
						className="delete-button self-end flex p-2 m-2"
					>
						<AiTwotoneDelete className="text-xl" />
					</span>

					<DialogHeader>Edit the post.</DialogHeader>
					<form action="" onSubmit={sendPost}>
						<DialogBody divider>
							<Input
								label={post.text}
								type="text"
								name="text"
								value={postValue}
								onChange={e => setPostValue(e.target.value)}
							/>
						</DialogBody>
						<DialogFooter>
							<Button
								type="button"
								variant="text"
								color="red"
								onClick={handleOpen}
								className="cancel-button mr-1"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								variant="gradient"
								color="blue"
								className="confirm-button"
							>
								Confirm
							</Button>
						</DialogFooter>
					</form>
				</Dialog>
			)}
		</Fragment>
	);
}

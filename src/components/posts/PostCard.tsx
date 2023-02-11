import React, { useState } from 'react';
import useAuth from '@/firebase/usefirebaseUI';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useUserLibrary } from '../../firebase/usefirebaseUI';
import Avatar from 'avataaars';
import { useGetAvatar } from '@/hooks/useFetch';
import { serverTimestamp } from 'firebase/firestore';
import EditPost from './EditPost';
import {
	AiOutlineLike,
	AiOutlineDislike,
	AiOutlineComment,
} from 'react-icons/ai';
import { IPost } from './types';
import useFindUser from '../../hooks/useFindUser';
import { current } from '@reduxjs/toolkit';

const Postcard = (post: IPost) => {
	const { currentUser } = useAuth();
	const { getCurrentUser } = useUserLibrary(currentUser?.uid)!;
	const [editable, setEditable] = useState<boolean>(false);
	const getAvatar = useGetAvatar();

	return (
		<div key={post.id} className="flex w-full p-8 py-16 ">
			<div className="flex flex-col border shadow-md overflow-y-auto w-full max-h-25rem">
				<div className="w-full flex flex-col bg-gradient  bg-gray-100/90   rounded  ring-gray-900/10  h-full">
					<div className="flex flex-col w-full ">
						<div className="flex items-center justify-around w-full  h-24">
							<div className="w-[85%] flex">
								<Avatar
									style={{ width: '50px', height: '50px' }}
									avatarStyle="Circle"
									{...getAvatar}
								/>
								<span className="text-xs text-gray-500 flex  flex-col justify-end">
									<span className="font-semibold text-blue-gray-800 flex flex-col">
										{useFindUser(post?.uid)?.displayName}
									</span>
									<span className="text-[12px] text-gray-600 italic font-light">
										{post?.createdAt?.toDate()?.toLocaleTimeString()}{' '}
										{post?.createdAt?.toDate()?.toLocaleDateString()}
									</span>
								</span>
							</div>
							{currentUser?.uid === post?.uid && <EditPost post={post} />}
						</div>

						{post?.photoURL && (
							<img
								src={post?.photoURL}
								alt="post image"
								className="max-w-full w-full max-h-96  object-cover rounded p-2"
							/>
						)}
					</div>
					<div className="w-full min-h-24   flex px-2 pt-8 flex-col ">
						<div className="pb-8 p-2">
							{post?.text && (
								<p className="text-base text-gray-800 w-[80%]">{post?.text}</p>
							)}
						</div>
						<div className="flex text-2xl w-fit gap-4 p-2 px-16 self-start">
							<span>
								<AiOutlineLike />
							</span>
							<span>
								<AiOutlineComment />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Postcard;
import React, { useRef, useState } from 'react';
import PostCard from './PostCard';
import SendPost from '../posts/SendPost';
import { Button } from '@material-tailwind/react';
import { useFetchDB } from '../../hooks/useFetch';
import { FirebaseDatabase } from '@firebase/database-types';

function Posts() {
	const [openPostFields, setOpenPostFields] = useState<boolean>(false);
	const postRef = useRef<HTMLDivElement>(null);
	const posts: FirebaseDatabase[] = useFetchDB('posts', 'desc');

	return (
		<div className=" flex flex-col h-full">
			<div className="flex  top-0 z-[200] w-full justify-end">
				{openPostFields ? (
					<SendPost setOpenPostFields={setOpenPostFields} />
				) : (
					<Button className={``} onClick={() => setOpenPostFields(true)}>
						POST
					</Button>
				)}
			</div>
			<div
				ref={postRef}
				className="relative overflow-y-auto flex flex-col  scrollbar-hide md:scrollbar-default scroll-bar  "
			>
				{posts?.map(({ id, text, title, userName, photoURL, uid }: any) => {
					return <PostCard key={id} {...{ id, text, title, photoURL, uid }} />;
				})}
			</div>
		</div>
	);
}

export default Posts;

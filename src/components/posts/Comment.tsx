import React, { useState } from 'react';

interface Comment {
	text: string;
}

const CommentAndLikeButton: React.FC = () => {
	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState<Comment[]>([]);
	const [comment, setComment] = useState('');

	const handleLike = () => {
		setLikes(likes + 1);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setComments([...comments, { text: comment }]);
		setComment('');
	};

	return (
		<div className="flex flex-col">
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={handleLike}
			>
				Like ({likes})
			</button>
			<form className="mt-4" onSubmit={handleSubmit}>
				<input
					className="border border-gray-400 p-2"
					type="text"
					value={comment}
					onChange={e => setComment(e.target.value)}
				/>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
					type="submit"
				>
					Submit
				</button>
			</form>
			<ul className="mt-4">
				{comments.map((c, i) => (
					<li key={i} className="p-2 border border-gray-400">
						{c.text}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CommentAndLikeButton;

import React, { Dispatch, SetStateAction, useState } from 'react';
import { IPost } from './types';
import { Textarea, Button } from '@material-tailwind/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import useAuth, { useUserLibrary } from '../../firebase/usefirebaseUI';
import firebase, { db } from '@/firebase/firebase';
import { GiCancel } from 'react-icons/gi';
import uuid from 'react-uuid';
import { type } from 'os';
interface IComment {
  id?: string;
  text: string;
  receiver: string;
  sender: [string, string];
  timeStamp: any;
  likes: any;
  userName: string;
  parentID: string;
  isParent: boolean;
}

const Comments: React.FC<{
  data: IPost;
  setOpenComment: Dispatch<SetStateAction<boolean>>;
  types: string;
  post: IPost;
}> = ({ data, setOpenComment, types, post }) => {
  const [comments, setComments] = useState<any>([]);
  const [text, setText] = useState('');
  const { currentUser } = useAuth();
  const { getCurrentUser } = useUserLibrary(currentUser?.uid);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment: IComment = {
      id: uuid(),
      text: text.trim(),
      sender: [currentUser?.email!, getCurrentUser?.userId!],
      receiver: `${types === 'comment' ? post?.uid : data.id}`,
      timeStamp: Date.now(),
      likes: [],
      parentID: `${types === 'comment' ? post?.uid : data.id}`,
      userName: getCurrentUser?.displayName,
      isParent: types === 'comment',
    };

    try {
      await db
        .collection('posts')
        .doc(post?.id)
        .update(
          types === 'comment'
            ? {
                comments: firebase.firestore.FieldValue.arrayUnion(newComment),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              }
            : {
                subComments:
                  firebase.firestore.FieldValue.arrayUnion(newComment),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
        );

      setText('');
    } catch (error) {
      console.error(error);
    }
    setOpenComment((prev) => !prev);
  };

  return (
    <div className='flex flex-col '>
      <button
        onClick={() => setOpenComment((prev) => !prev)}
        className=' flex w-full  items-center justify-end p-2 text-xl text-red-400'>
        <GiCancel />
      </button>
      <form onSubmit={handleSubmit} className='mb-4'>
        <Textarea
          className='border p-2 w-full'
          label='Write a comment...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type='submit' className='bg-blue-500 text-white p-2 mt-2'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Comments;

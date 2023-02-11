import { db } from '@/firebase/firebase';
import { useState, useCallback } from 'react';

export const useDeletePost = () => {
	const [dLoading, setIsLoading] = useState(false);
	const [dError, setError] = useState<Error | null>(null);

	const deletePost = useCallback(async (postId: string) => {
		setIsLoading(true);
		setError(null);

		try {
			await db.doc(`posts/${postId}`).delete();
		} catch (e: any) {
			setError(e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { deletePost, dLoading, dError };
};

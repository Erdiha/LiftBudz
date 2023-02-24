import { db, storage } from '@/firebase/firebase';
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useDelete = () => {
  const [dLoading, setIsLoading] = useState(false);
  const [dError, setError] = useState<Error | null>(null);

  const deleteForMe = useCallback(
    async (type: string, recipientID: any, currentUSER: any) => {
      setIsLoading(true);
      setError(null);
      const collectionREF = db.collection(`${type}`);
      console.log('these are the users in deleteforme', recipientID);
      try {
        const querySnapshot = await collectionREF.get();
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const data = doc.data();
          // update the data as needed
          if (
            (data.conversationId[0] === recipientID ||
              data.conversationId[1] === recipientID) &&
            (data.conversationId[0] === currentUSER ||
              data.conversationId[1] === currentUSER)
          ) {
            await doc.ref.update({ ...data, senderDeleted: true });
          }
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        toast('Conversation Removed');
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteDoc = useCallback(async (type: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await db.doc(`${type}`).delete();
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteItem = useCallback(async (ID: string, type: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const docRef = db.doc(`${type}/${ID}`);
      const doc = await docRef.get();
      const message = doc.data();
      // Check if the message has an image URL
      if (message?.image) {
        // Get a reference to the image file in Firebase Storage
        const storageRef = storage.refFromURL(message.image);
        // Delete the image file from Firebase Storage
        await storageRef.delete();
      }
      // Delete the message document from Firestore
      await docRef.delete();
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteForMe, deleteDoc, deleteItem, dLoading, dError };
};

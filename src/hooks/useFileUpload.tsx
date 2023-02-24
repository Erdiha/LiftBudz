import { useState } from 'react';
import { storage, ref, deleteObject, db, auth } from '@/firebase/firebase';

async function uploadPhoto(file: File) {
  // Create a reference to the file to be uploaded
  const fileRef = storage.ref().child(`postImages/${file.name}`);
  // Upload the file to Firebase Storage
  const snapshot = await fileRef.put(file);
  // Get the download URL for the uploaded photo
  const downloadURL = await snapshot.ref.getDownloadURL();
  return downloadURL;
}

interface Props {
  imageUrl: string | null;
}

export default function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [imageLoading, setLoading] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true);
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      try {
        const url = await uploadPhoto(selectedFile);
        setFile(selectedFile);
        setDownloadURL(url);
        setLoading(false);

        const userRef = db
          .collection('users')
          .where('userId', '==', auth.currentUser?.uid);
        const snapshot = await userRef.get();

        snapshot.forEach(async (doc) => {
          await doc.ref.update({ imageUrl: url });
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleDelete = () => {
    if (downloadURL) {
      const storageRef = storage.refFromURL(downloadURL);

      deleteObject(storageRef)
        .then(() => {
          console.log('Image deleted successfully');
          setDownloadURL(null);
        })
        .catch((error) => {
          console.error('Error deleting image:', error);
        });
    }
  };

  const handleButtonClick = () => {
    const inputElement: HTMLInputElement | any =
      document.createElement('input');
    inputElement.type = 'file';
    inputElement.onchange = handleFileChange;
    inputElement.click();
  };

  return { file, downloadURL, handleButtonClick, imageLoading, handleDelete };
}

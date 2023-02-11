import { useState } from 'react';
import { storage } from '@/firebase/firebase';

async function uploadPhoto(file: File) {
	// Create a reference to the file to be uploaded
	const fileRef = storage.ref().child(`postImages/${file.name}`);
	// Upload the file to Firebase Storage
	const snapshot = await fileRef.put(file);
	// Get the download URL for the uploaded photo
	const downloadURL = await snapshot.ref.getDownloadURL();
	return downloadURL;
}

export default function useFileUpload() {
	const [file, setFile] = useState<File | null>(null);
	const [imageLoading, setLoading] = useState<boolean>(false);
	const [downloadURL, setDownloadURL] = useState<string | null>(null);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setLoading(true);
		const selectedFile = event.target.files?.[0];

		if (selectedFile) {
			try {
				setFile(selectedFile);
				const url = await uploadPhoto(selectedFile);
				setDownloadURL(url);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		}
	};

	const handleButtonClick = () => {
		const inputElement: any = document.createElement('input');
		inputElement.type = 'file';
		inputElement.onchange = handleFileChange;
		inputElement.click();
	};

	return { file, downloadURL, handleButtonClick, imageLoading };
}

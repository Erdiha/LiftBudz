import { storage } from '@/firebase/firebase';
import React, { useState } from 'react';

async function uploadPhoto(file: File) {
	// Create a storage reference
	const storageRef = storage.ref();

	// Create a reference to the file to be uploaded
	const fileRef = storageRef.child(`photos/${file.name}`);

	// Upload the file to Firebase Storage
	const snapshot = await fileRef.put(file);

	// Get the download URL for the uploaded photo
	const downloadURL = await snapshot.ref.getDownloadURL();

	return downloadURL;
}

export const handleFileChange = async (
	event: React.ChangeEvent<HTMLInputElement>,
	setFile: any,
	setDownloadURL: any
) => {
	const selectedFile = event.target.files?.[0];

	if (selectedFile) {
		setFile(selectedFile);
		const url = await uploadPhoto(selectedFile);
		setDownloadURL(url);
	}
};

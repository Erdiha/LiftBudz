export interface IPost {
	id: string;
	text: string;
	createdAt: any;
	photoURL?: string;
	uid: string;
	likes?: any;
	comments?: any;
	timeStamp: Date | null | number;
}

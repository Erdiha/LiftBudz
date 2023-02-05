import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
	id: string;
	displayName: string;
	email: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	photoURL: string;
}
const initialState: UserData = {
	id: '',
	displayName: '',
	email: '',
	description: '',
	photoURL: '',
	createdAt: '',
	updatedAt: '',
};

const updateUserSlice = createSlice({
	name: 'updateUser',
	initialState,
	reducers: {
		updateUserStart: (state: UserData) => {
			state.id = '';
			state.displayName = '';
			state.email = '';
			state.description = '';
			state.photoURL = '';
			state.createdAt = '';
			state.updatedAt = '';
		},
		updateUserSuccess: (state: UserData, action: PayloadAction<UserData>) => {
			state.id = action.payload.id;
			state.displayName = action.payload.displayName;
			state.email = action.payload.email;
			state.description = action.payload.description;
			state.photoURL = action.payload.photoURL;
			state.createdAt = action.payload.createdAt;
			state.updatedAt = action.payload.updatedAt;
		},
		updateUserFailure: (state: UserData, action: PayloadAction<string>) => {
			console.error(action.payload);
		},
	},
});

export const { updateUserStart, updateUserSuccess, updateUserFailure } =
	updateUserSlice.actions;
export default updateUserSlice.reducer;

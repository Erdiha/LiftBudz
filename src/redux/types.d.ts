type IFetchPostAction = {
  type: string;
  payload?: any;
  error?: any;
};
interface Data {
  id: string;
  name: string;
}

export interface User {
  id: string;
  displayName?: string;
  email: string;
  description?: string;
  createdAt: string;
  photoURL?: string;
}

export interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

export interface IChat {
  conversationId: any;
  sender: String;
  receiver: String;
  timestamp: any;
  receiverHasRead: Boolean;
  text: String;
  image?: String;
  createdAt: any;
}

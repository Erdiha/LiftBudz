export interface IUser {
  id: string | number;
  title: string;
  message: string;
  read: boolean;
  friends: [string];
  link: string;
  image: string;
  liked: boolean;
}

export interface IUser {
  description: string;
  displayName: string;
  email: string;
  id: string;
  location: string;
  mobile: string;
  profileMotto: string;
  userId: string;
  photoURL: string;
}

export interface ICard {
  feature: { title: string; description: string; link: string };
  data: string;
}

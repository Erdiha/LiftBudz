export interface ITabs {
  name: string;
  icon: any;
  tabName: string;
  notification?: number;
}

export interface IActiveTabs {
  setActiveTab: (tabName: string) => void;
  activeTab: string;
}

export interface IMessage {
  sender: String;
  receiver: String;
  timestamp: any;
  receiverHasRead: Boolean;
  text: String;
  image?: String;
  createdAt: any;
}

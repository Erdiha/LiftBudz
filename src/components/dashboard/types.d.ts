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

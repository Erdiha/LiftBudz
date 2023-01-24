interface IAction {
  type: string;
  payload?: any;
}

export function myAction(payload: any): IAction {
  return {
    type: 'MY_ACTION',
    payload,
  };
}

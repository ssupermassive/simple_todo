export interface INote {
  id: number;
  text: string;
  title?: string;
  color?: string;
}

export interface IEventTarget extends HTMLElement {
  value: string;
  name: string;
}

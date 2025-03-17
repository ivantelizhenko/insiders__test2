import { ReactNode } from 'react';

export interface Tab {
  id: string;
  title: string;
}

export type TabsState = {
  tabs: Tab[];
};

export type TabsContextValue = TabsState & {
  addTab: (newTab: Tab) => void;
  removeTab: (id: string) => void;
};

export type TabsContextProviderProps = {
  children: ReactNode;
};

type AddTabAction = {
  type: 'tab/add';
  payload: Tab;
};
type RemoveTabAction = {
  type: 'tab/remove';
  payload: string;
};

export type Action = AddTabAction | RemoveTabAction;

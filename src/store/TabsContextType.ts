import { UniqueIdentifier } from '@dnd-kit/core';
import { ReactNode } from 'react';

export interface Tab {
  id: UniqueIdentifier;
  title: string;
}

export type TabsState = {
  tabs: Tab[];
  activeId: UniqueIdentifier | null;
};

export type TabsContextValue = TabsState & {
  addTab: (newTab: Tab) => void;
  removeTab: (id: UniqueIdentifier) => void;
  setTabs: (newTabs: Tab[]) => void;
  setActiveId: (id: UniqueIdentifier) => void;
  removeActiveId: () => void;
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
  payload: UniqueIdentifier;
};
type MoveTabAction = {
  type: 'tab/move';
  payload: Tab[];
};
type SetActiveIdAction = {
  type: 'activeId/set';
  payload: UniqueIdentifier;
};
type RemoveActiveIdAction = {
  type: 'activeId/remove';
};

export type Action =
  | AddTabAction
  | RemoveTabAction
  | MoveTabAction
  | SetActiveIdAction
  | RemoveActiveIdAction;

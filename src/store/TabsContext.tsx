import { createContext, useContext, useReducer } from 'react';
import {
  Action,
  Tab,
  TabsContextProviderProps,
  TabsContextValue,
  TabsState,
} from './TabsContextType';

const TabsContext = createContext<TabsContextValue | null>(null);

const initialState: TabsState = {
  tabs: [],
};

function tabsReducer(state: TabsState, action: Action): TabsState {
  switch (action.type) {
    case 'tab/add': {
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
      };
    }
    case 'tab/remove': {
      return {
        ...state,
        tabs: state.tabs.filter((tab: Tab) => tab.id !== action.payload),
      };
    }
    default:
      throw new Error('Unknown action type');
  }
}

function TabsProvider({ children }: TabsContextProviderProps) {
  const [tabsState, dispatch] = useReducer(tabsReducer, initialState);

  const ctx: TabsContextValue = {
    ...tabsState,
    addTab(newTab) {
      dispatch({ type: 'tab/add', payload: newTab });
    },
    removeTab(id) {
      dispatch({ type: 'tab/remove', payload: id });
    },
  };

  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>;
}

function useTabs() {
  const context = useContext(TabsContext);
  if (context === undefined)
    throw new Error('BooksContext was used outside of the BooksProvider');

  return context as TabsContextValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TabsProvider, useTabs };

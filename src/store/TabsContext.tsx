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
  tabs: [
    { title: 'title 1', id: Math.random() + '' },
    { title: 'title 2', id: Math.random() + '' },
    { title: 'title 3', id: Math.random() + '' },
    { title: 'title 4', id: Math.random() + '' },
    { title: 'title 5', id: Math.random() + '' },
    { title: 'title 6', id: Math.random() + '' },
    { title: 'title 7', id: Math.random() + '' },
    { title: 'title 8', id: Math.random() + '' },
    { title: 'title 9', id: Math.random() + '' },
    { title: 'title 10', id: Math.random() + '' },
    { title: 'title 11', id: Math.random() + '' },
    { title: 'title 12', id: Math.random() + '' },
    { title: 'title 13', id: Math.random() + '' },
    { title: 'title 14', id: Math.random() + '' },
    { title: 'title 15', id: Math.random() + '' },
    { title: 'title 16', id: Math.random() + '' },
    { title: 'title 17', id: Math.random() + '' },
    { title: 'title 18', id: Math.random() + '' },
    { title: 'title 19', id: Math.random() + '' },
    { title: 'title 20', id: Math.random() + '' },
  ],
  activeId: null,
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
        tabs: state.tabs.filter((tab: Tab) => {
          console.log(tab.id !== action.payload);
          return tab.id !== action.payload;
        }),
      };
    }
    case 'tab/move': {
      return {
        ...state,
        tabs: action.payload,
      };
    }
    case 'activeId/remove': {
      return { ...state, activeId: null };
    }
    case 'activeId/set': {
      return { ...state, activeId: action.payload };
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
    setActiveId(id) {
      dispatch({ type: 'activeId/set', payload: id });
    },
    removeActiveId() {
      dispatch({ type: 'activeId/remove' });
    },
    setTabs(newTabs) {
      dispatch({ type: 'tab/move', payload: newTabs });
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

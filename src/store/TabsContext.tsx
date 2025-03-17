import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  Action,
  Tab,
  TabsContextProviderProps,
  TabsContextValue,
  TabsState,
} from './TabsContextType';
import { getLocalStorage } from '../services/manageLocaleStorage';
import { TAB_LOCAL_STORAGE_KEY } from '../utils/constants';

const TabsContext = createContext<TabsContextValue | null>(null);

const initialState: TabsState = {
  tabs: [],
  activeId: null,
};

function tabsReducer(state: TabsState, action: Action): TabsState {
  switch (action.type) {
    case 'tabs/loaded': {
      return {
        ...state,
        tabs: action.payload,
      };
    }
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

  useEffect(() => {
    const tabs = getLocalStorage(TAB_LOCAL_STORAGE_KEY);
    dispatch({ type: 'tabs/loaded', payload: tabs || [] });
  }, []);

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
    moveTabs(movedTabs) {
      dispatch({ type: 'tab/move', payload: movedTabs });
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

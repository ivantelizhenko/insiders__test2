import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import PageNotFound from './pages/PageNotFound';
import Navigation from './pages/Navigation';
import { useTabs } from './store/TabsContext';
import Page from './pages/Page';
import { TAB_LOCAL_STORAGE_KEY } from './utils/constants';
import { saveToLocalStage } from './services/manageLocaleStorage';

function App() {
  const { tabs } = useTabs();

  saveToLocalStage(TAB_LOCAL_STORAGE_KEY, [
    { title: 'title 1', id: 'XA86yi55Vi' },
    { title: 'title 2', id: '3hGd9ZC8z6' },
    { title: 'title 3', id: 'Vv9c8Be2Z8' },
    { title: 'title 4', id: '8742mNdbDS' },
    { title: 'title 5', id: 'Mv2558DgtU' },
    { title: 'title 6', id: 'sA3VAak294' },
    { title: 'title 7', id: 'f3V78R8Fed' },
    { title: 'title 8', id: 'v54SH6Dyk3' },
    { title: 'title 9', id: '867CGsJie3' },
    { title: 'title 10', id: '027C5sJsea' },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="/app" />} />
        <Route path="/app" element={<Navigation />}>
          {tabs.map(tab => (
            <Route key={tab.id} path={tab.id as string} element={<Page />} />
          ))}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

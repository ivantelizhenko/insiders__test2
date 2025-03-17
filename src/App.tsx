import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import PageNotFound from './pages/PageNotFound';
import Navigation from './pages/Navigation';
import { useTabs } from './store/TabsContext';
import Page from './pages/Page';

function App() {
  const { tabs } = useTabs();

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

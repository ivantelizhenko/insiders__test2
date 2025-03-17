import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import PageNotFound from './pages/PageNotFound';
import Page from './pages/Page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="/app" />} />
        <Route path="/app" element={<Page />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

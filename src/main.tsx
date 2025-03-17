import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import GlobalStyles from './styles/GlobalStyles.ts';
import { TabsProvider } from './store/TabsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabsProvider>
      <App />
    </TabsProvider>
    <GlobalStyles />
  </StrictMode>
);

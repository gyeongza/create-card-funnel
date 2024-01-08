import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Global } from '@emotion/react';
import globalStyles from './styles/globalStyles.ts';
import { AlertContextProvider } from './contexts/AlertContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthGuard from './components/auth/AuthGuard.tsx';

const client = new QueryClient({
  defaultOptions: {},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <QueryClientProvider client={client}>
      <AlertContextProvider>
        <AuthGuard>
          <App />
        </AuthGuard>
      </AlertContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

import { Provider} from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider} from '@auth0/auth0-react';
import {EventosProvider} from '@/contexts/EventosContext.tsx';
import { BrowserRouter } from "react-router"
import { TestAuthProvider } from "./test/TestAuthProvider.tsx";

const isTest = import.meta.env.MODE === 'test';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     {isTest ? (
    <TestAuthProvider>
      <Provider>
        <EventosProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </EventosProvider>
      </Provider>
    </TestAuthProvider>
  ) : (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE
      }}
    >
      <Provider>
        <EventosProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </EventosProvider>
      </Provider>
    </Auth0Provider>)}
  </StrictMode>,
)

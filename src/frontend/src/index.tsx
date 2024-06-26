import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {PublicClientApplication, EventType, AccountInfo} from '@azure/msal-browser';
import { msalConfig } from './authConfig';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Simulate} from "react-dom/test-utils";
import pause = Simulate.pause;

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
const activeAccount = msalInstance.getActiveAccount();
if (!activeAccount && msalInstance.getAllAccounts().length > 0) {
    const accounts = msalInstance.getAllAccounts();
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(accounts[0]);
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload;
        if (isAccountInfo(payload)) {
            msalInstance.setActiveAccount(payload);
        }
    }
});

function isAccountInfo(payload: any): payload is AccountInfo {
    return typeof payload === 'object' && payload !== null && 'homeAccountId' in payload;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App instance={msalInstance}/>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

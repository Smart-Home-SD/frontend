import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './router/Router';
import { AuthContext } from './helpers/auth/auth';


function App() {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (

    <BrowserRouter>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;

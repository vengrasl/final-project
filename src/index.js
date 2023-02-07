import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import { QuestionProvider } from './context/QuestionContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <QuestionProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QuestionProvider>
    </UserProvider>
);

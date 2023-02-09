import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import { QuestionProvider } from './context/QuestionContext';
import { AnswerProvider } from './context/AnswerContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <QuestionProvider>
            <AnswerProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AnswerProvider>
        </QuestionProvider>
    </UserProvider>
);

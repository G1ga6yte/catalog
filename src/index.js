import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./source/fonts.scss"
import "./source/mixin.scss"
import "./source/var.scss"
import App from './App';
import {CartProvider} from "./cartContext";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
    <StrictMode>
        <BrowserRouter>
            <CartProvider>
                <App/>
            </CartProvider>
        </BrowserRouter>
    </StrictMode>,
);


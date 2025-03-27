import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer/>
            <App />
        </BrowserRouter>
    </Provider>
)

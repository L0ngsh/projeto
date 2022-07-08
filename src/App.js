import React from "react";
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ListProvider } from "./Context/ListContext";
import E404 from "./pages/E404";
import Home from './pages/Home';

const App = () => {
    return (
        <ListProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<E404/>}></Route>
                </Routes>
            </BrowserRouter>
        </ListProvider>
    );
}

export default App;
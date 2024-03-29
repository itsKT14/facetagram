import './App.css';
import React from "react";
import {BrowserRouter} from "react-router-dom"; 
import RouterComponent from "./components/routes/Router";

function App() {
    return (
        <BrowserRouter>
            <RouterComponent/>
        </BrowserRouter>
    );
}

export default App;

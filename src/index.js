import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Trending from './pages/Trending';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>


            <Route path="/Profil" element={<Profil/>}/>

            <Route path="/Trending" element={ <Trending/>}/>


        </Routes>
        </Router>
    </React.StrictMode>
);
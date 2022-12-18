import React from 'react';
import UpdateProfil from "../components/profil/UpdateProfil";
import Header from "../components/Header";
import Navbar from '../components/Navbar';
import "../styles/profil.scss";

const Profil = () => {
    return (
        <div className="profil-page">
            <Header/>
            <Navbar/>
            <UpdateProfil/>
        </div>
    );
};

export default Profil;
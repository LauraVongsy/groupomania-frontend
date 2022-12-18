import React from 'react';
import {FaDoorOpen} from 'react-icons/fa';
import {BiHome} from "react-icons/bi";
import {CgProfile} from "react-icons/cg";
import '../../styles/Navbar.scss';

const navBar = () => {
    const handleHome = (e) => {
        e.preventDefault();
        window.location.href = '/trending';
    }
    const handleProfile = (e) => {
        e.preventDefault();
        window.location.href = '/profil';
    }
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    }


    return (
        <div className="navbar">
            <div className="nav-btn">
                <button title="Accueil" onClick={handleHome}><BiHome id="home-btn"/></button>
            </div>
            <div className="nav-btn">
                <button title="Profile" onClick={handleProfile}><CgProfile id="profile-btn"/></button>
            </div>
            <div className="nav-btn">
                <button title="Se déconnecter" onClick={handleLogout}><FaDoorOpen id="logout-btn"/></button>
            </div>

        </div>
    );
};

export default navBar;
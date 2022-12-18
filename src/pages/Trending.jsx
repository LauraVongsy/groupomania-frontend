import React from 'react';
import Header from '../components/Header';
import CreatePost from '../components/Posts/CreatePost';
import Navbar from '../components/Navbar';
import DisplayPosts from "../components/Posts/DisplayPosts";


const Trending = () => {
    return (
        <div>
            <Header/>
            <Navbar/>
            <CreatePost/>
            <DisplayPosts/>
        </div>
    );
};

export default Trending;
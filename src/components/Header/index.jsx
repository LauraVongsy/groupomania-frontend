import React from 'react';

const header = () => {
    return (
        <div className= "header-container">

            <div className="header-logo">
                <img src= {process.env.PUBLIC_URL + "/assets/icon-left-font.png"} alt="logo" id="logo" />
            </div>
        </div>
    );
};

export default header;
import React from 'react';
import NavBar from '../components/nav/nav';
import Header from '../components/header/header';

const Home = () => {
    return (
        <div id='div-main'>
            <div className="container">
                < Header />
                <div className="contain-content">
                    < NavBar />
                </div>
            </div>
        </div>
    )
}

export default Home;
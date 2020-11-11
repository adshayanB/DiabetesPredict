import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to='/predict'>Go To Predictor</Link>
        </div>
    )
}

export default Home;
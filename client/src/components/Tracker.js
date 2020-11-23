import React, { useLayoutEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import Context from '../utils/context';

const Tracker = () => {
    const context = useContext(Context);

    useLayoutEffect(() => {
        context.assignShowNav(true);
    }, []);
    
    return (
        <div>
            <h1>Tracker</h1>
        </div>
    )
}

export default Tracker;

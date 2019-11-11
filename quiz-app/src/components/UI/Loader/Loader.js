import React from 'react';
import styles from './Loader.module.css';

const Loader = props => {
    return (
        <div className = {styles.center}>
            <div className= {styles.ldsEllipsis}>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
};

export default Loader;
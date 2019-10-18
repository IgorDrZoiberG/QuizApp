import React from 'react';
import styles from './MenuBar.module.css';


const MenuBar = props => {
    const classes = [
        styles.MenuBar,
        'fa',

    ];

    if (props.isOpen){
        classes.push('fa-times');
        classes.push(styles.open)
    }
    else {
        classes.push('fa-bars')
    }
    return (
        <i
            className={classes.join(' ')}
            onClick={props.toggle}
        />
        )
};

export default MenuBar;
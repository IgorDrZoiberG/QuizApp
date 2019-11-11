import React from 'react';
import styles from './DropMenu.module.css';
import BackDrop from "../../UI/BackDrop/BackDrop";
import {NavLink} from "react-router-dom";


class DropMenu extends React.Component {
    CloseBarHandler = () => {
        this.props.close();
    };
    renderLinks = (links) => {
        return (
            links.map((link, index) => {
                return (
                    <li key={index}>
                        <NavLink
                            to={link.to}
                            exact={link.exact}
                            onClick={this.CloseBarHandler}
                        >
                            {link.label}
                        </NavLink>
                    </li>
                )
            })
        )
    };

    render() {
        const classes = [
            styles.DropMenu,

        ];
        if (!this.props.isOpen) {
            classes.push(styles.close)
        }

        const links = [
            {to: '/', label: 'Список', exact: true},

        ];

        if (this.props.isUserLogIn) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
            links.push({to: '/logout', label: 'Выйти', exact: false});
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false});
        }
        return (
            <>
                <nav className={classes.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.close}/> : null}
            </>
        )
    }
}

export default DropMenu;
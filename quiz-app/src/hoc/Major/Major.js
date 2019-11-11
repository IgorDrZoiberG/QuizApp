import React from 'react';
import styles from './Major.module.css';
import MenuBar from "../../components/Navigation/MenuBar/MenuBar";
import DropMenu from "../../components/Navigation/DropMenu/DropMenu";
import {connect} from "react-redux";

class Major extends React.Component {
    state = {
        menu: false
    };
    toggleMenuHandler = props => {
        this.setState({
            menu: !this.state.menu
        })
    };

    menuCloseHandler = props => {
        this.setState({
            menu: false
        })
    };

    render() {
        return (
            <div className={styles.Major}>
                <MenuBar
                    toggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}

                />
                <DropMenu
                    isOpen={this.state.menu}
                    close={this.menuCloseHandler}
                    isUserLogIn = {this.props.isUserLogIn}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isUserLogIn: !!state.auth.token
    }
};

export default connect(mapStateToProps)(Major);
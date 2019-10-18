import React from 'react';
import styles from './Major.module.css';
import MenuBar from "../../components/Navigation/MenuBar/MenuBar";
import DropMenu from "../../components/Navigation/DropMenu/DropMenu";

class Major extends React.Component {
    state = {
      menu: false
    };
    toggleMenuHandler = props => {
        this.setState({
            menu: !this.state.menu
        })
    };

    menuCloseHandler = props =>{
      this.setState({
          menu: false
      })
    };

    render() {
        return(
            <div className={styles.Major}>
                <MenuBar
                toggle = {this.toggleMenuHandler}
                isOpen = {this.state.menu}

                />
                <DropMenu
                    isOpen = {this.state.menu}
                    close = {this.menuCloseHandler}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Major;
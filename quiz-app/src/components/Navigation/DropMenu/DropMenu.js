import React from 'react';
import styles from './DropMenu.module.css';
import BackDrop from "../../UI/BackDrop/BackDrop";
const links = [1,2,4];

class DropMenu extends React.Component {
    renderLinks = () => {
      return (
          links.map((link, index)=>{
              return(
                  <li key={index}>
                      <a> link {link} </a>
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
      return (
          <>
          <nav className={classes.join(' ')}>
              <ul>
                  {this.renderLinks()}
              </ul>
          </nav>
              {this.props.isOpen? <BackDrop onClick = {this.props.close}/> : null }
              </>
      )
    }
}

export default DropMenu;
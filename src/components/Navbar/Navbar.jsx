import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

export default function Navbar(props){
    return (
        <div className={styles.navbarContainer}>
            {
                props.navLinks.map(link => {
                    return (
                        <Link to={link.label} key={link.label}> {link.label} </Link>
                    )
                })
            }
        </div>
    )
}
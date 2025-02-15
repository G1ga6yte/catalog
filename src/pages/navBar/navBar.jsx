import React from 'react';
import './NavBar.scss';
import iconImg from "./Troton-logo-footer.svg"
import iconText from "./Troton.svg"
import {Link} from "react-router";

function NavBar() {
    return (
        <div className='NavBarContainer'>
            <Link className="homeLink" to="/">
                <img src={iconImg} alt="" className="iconImg" />
                <img src={iconText} alt="" className="iconText"/>
            </Link>
        </div>
    );
}

export default NavBar;
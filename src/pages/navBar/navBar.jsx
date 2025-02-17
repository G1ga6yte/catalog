import React from 'react';
import './NavBar.scss';
import iconImg from "./Troton-logo-footer.svg"
import iconText from "./Troton.svg"
import {Link} from "react-router";
import { IoIosCall } from "react-icons/io";

function NavBar() {
    return (
        <div className='NavBarContainer'>
            <div className="cont">
                <Link className="homeLink" to="/">
                    <img src={iconImg} alt="" className="iconImg" />
                    <img src={iconText} alt="" className="iconText"/>
                </Link>

                <a className="phoneLink" href="tel:+37499207090"> <IoIosCall className="icon" />
                    Կապվեք մեզ հետ</a>
            </div>
        </div>
    );
}

export default NavBar;
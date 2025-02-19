import React from 'react';
import './NavBar.scss';
import iconImg from "./Troton-logo-footer.svg"
import iconText from "./Troton.svg"
import {Link, useNavigate} from "react-router";
import { IoIosCall } from "react-icons/io";

function NavBar() {
    const navigate = useNavigate();
    return (
        <div className='NavBarContainer'>
            <div className="cont">
                <button onClick={()=>navigate(-1)} className="homeLink" >
                    <img src={iconImg} alt="" className="iconImg" />
                    <img src={iconText} alt="" className="iconText"/>
                </button>

                <a className="phoneLink" href="tel:+37499207090"> <IoIosCall className="icon" />
                    Свяжитесь с нами</a>
            </div>
        </div>
    );
}

export default NavBar;
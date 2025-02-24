import React from 'react';
import './NavBar.scss';
import iconImg from "./Troton-logo-footer.svg"
import iconText from "./Troton.svg"
import {Link, useNavigate} from "react-router";
import { IoIosCall } from "react-icons/io";
import {useCartContext} from "../../cartContext";
import { FaRegUserCircle } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import Cookies from "js-cookie";

function NavBar() {
    const navigate = useNavigate();
    const {accountInfo, setAccountInfo, setAuthenticated, setLoading, setLoginCont} = useCartContext()



    return (
        <div className='NavBarContainer'>
            <div className="cont">
                <button onClick={()=>navigate(-1)} className="homeLink" >
                    <img src={iconImg} alt="" className="iconImg" />
                    <img src={iconText} alt="" className="iconText"/>
                </button>

                <div className="rightLinks">
                    <a className="phoneLink" href="tel:+37499207090"> <IoIosCall className="icon" />
                        {/*<span>Свяжитесь с нами</span>*/}
                        <span className="desktopNumber">+374 99 207090</span>
                    </a>

                    {accountInfo &&
                        <div className="accountLogo">
                            <FaRegUserCircle className="userIcon" />
                            <p className="username">{accountInfo.name}</p>
                        </div>
                    }

                    {!accountInfo &&
                        <button onClick={()=>setLoginCont(true)} className="loginBtn">
                            Логин
                        </button>
                    }

                    {accountInfo &&
                        <button className="exitBtn" onClick={()=>{
                            setLoading(true)
                            setTimeout(()=>{
                                setAccountInfo(null)
                                setAuthenticated(false)
                                Cookies.set('AccountInfo', JSON.stringify({}));
                                setLoading(false)
                            }, 500)
                      }}>
                            <ImExit className="exitIcon"/>
                            <p className="exitText">Выход</p>

                        </button>
                    }

                </div>


                
                
            </div>
        </div>
    );
}

export default NavBar;
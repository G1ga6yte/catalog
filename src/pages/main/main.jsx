import React, {useEffect} from 'react';
import './Main.scss';
import {Link, useNavigate} from "react-router";
import catalog1 from "./catalog_1.webp"
import catalog2 from "./catalog_2.webp"
import catalog3 from "./catalog_3.webp"
import catalog4 from "./catalog_4.webp"
import moreIcon from "./more.svg"
import { FaPlusCircle } from "react-icons/fa";
import {useCartContext} from "../../cartContext";
import Cookies from "js-cookie";



function Main() {

    const {loading, setLoading, setActiveType} = useCartContext()
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);


    }, []);

    const handleChangeRoute = (type) => {
        setLoading(true)
        setActiveType(type)
        navigate("/products")
        Cookies.set('Type', type, { expires: 365 });
    }

    return (
        <div className='MainContainer'>

            <p className="header">Каталоги`</p>

            <button onClick={()=>handleChangeRoute("Inter")} className="catalogLink" >
                <img src={catalog2} className="catalogImg" alt=""/>

                <div className="textCont">
                    <p className="name">
                        Каталог продукции Inter Troton
                    </p>

                    <img src={moreIcon} className="moreIcon" alt=""/>

                </div>
            </button>

            <button onClick={()=>handleChangeRoute("Master")} className="catalogLink" >
                <img src={catalog1} className="catalogImg" alt=""/>


                <div className="textCont">
                    <p className="name">
                        Каталог продукции Master
                    </p>

                    <img src={moreIcon} className="moreIcon" alt=""/>

                </div>

            </button>



            <button onClick={()=>handleChangeRoute("Rangers")} className="catalogLink" >
                <img src={catalog3} className="catalogImg" alt=""/>


                <div className="textCont">
                    <p className="name">
                        Каталог продукции Troton Specials Rangers
                    </p>

                    <img src={moreIcon} className="moreIcon" alt=""/>

                </div>
            </button>

            <button onClick={()=>handleChangeRoute("Brayt")} className="catalogLink" >
                <img src={catalog4} className="catalogImg" alt=""/>


                <div className="textCont">
                    <p className="name">
                        Каталог продукции Brayt
                    </p>

                    <img src={moreIcon} className="moreIcon" alt=""/>

                </div>
            </button>

            <button onClick={()=>handleChangeRoute("More")} className="catalogLink catalogMore" >

                <div className="textCont">
                    <p className="name">
                        Остальные продукты
                    </p>

                    <FaPlusCircle className="plusIcon" />


                    {/*<img src={moreIcon} className="moreIcon" alt=""/>*/}

                </div>
            </button>
        </div>
    );
}

export default Main;
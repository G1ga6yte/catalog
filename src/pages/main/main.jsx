import React from 'react';
import './Main.scss';
import {Link} from "react-router";
import catalog1 from "./catalog_1.webp"
import catalog2 from "./catalog_2.webp"
import catalog3 from "./catalog_3.webp"
import catalog4 from "./catalog_4.webp"
import moreIcon from "./more.svg"
import { FaPlusCircle } from "react-icons/fa";



function Main() {
    return (
        <div className='MainContainer'>

            <p className="header">Каталоги`</p>

            <Link className="catalogLink" to="/">
                <img src={catalog1} className="catalogImg" alt=""/>


                <div className="textCont">
                    <p className="name">
                        Каталог продукции Master
                    </p>

                    <img src={moreIcon} className="moreIcon" alt=""/>

                </div>

            </Link>

            <Link className="catalogLink" to="/">
                <img src={catalog2} className="catalogImg" alt=""/>

                <div className="textCont">
                    <p className="name">
                        Каталог продукции Inter Troton
                    </p>

                    <img src={moreIcon} className="moreIcon" alt=""/>

                </div>
            </Link>

            <Link className="catalogLink" to="/">
                <img src={catalog3} className="catalogImg" alt=""/>


                <div className="textCont">
                    <p className="name">
                        Каталог продукции Troton Specials Rangers
                    </p>

                    <img src={moreIcon} className="moreIcon" alt=""/>

                </div>
            </Link>

            <Link className="catalogLink" to="/">
                <img src={catalog4} className="catalogImg" alt=""/>


                <div className="textCont">
                    <p className="name">
                        Каталог продукции Brayt
                    </p>

                    <img src={moreIcon} className="moreIcon" alt=""/>

                </div>
            </Link>

            <Link className="catalogLink catalogMore" to="/">

                <div className="textCont">
                    <p className="name">
                        Остальные продукты
                    </p>

                    <FaPlusCircle className="plusIcon" />


                    {/*<img src={moreIcon} className="moreIcon" alt=""/>*/}

                </div>
            </Link>
        </div>
    );
}

export default Main;
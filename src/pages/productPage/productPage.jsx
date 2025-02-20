import React, {useEffect, useState} from 'react';
import "./ProductPage.scss"
import {useCartContext} from "../../cartContext";
import {useNavigate} from "react-router";
import Cookies from "js-cookie";
import { FaRegStar, FaStar } from "react-icons/fa";

function ProductPage(){
    const {product, setLoading, activeType} = useCartContext()
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        if (!product){
            navigate("/")
            return;
        }
        window.scrollTo(0,0);
        setTimeout(()=>{
            setLoading(false)
        } ,500)

    }, []);


    // Load favorites from cookies on component mount
    useEffect(() => {
        const savedFavorites = Cookies.get("favorites");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
        const isFavorite = favorites.some(item => item.productCode === product.productCode);
        setIsFavorite(isFavorite);
    }, []);

    // Check if product is in favorites

    // Toggle favorite (Add or Remove)
    const toggleFavorite = () => {
        let updatedFavorites;

        if (isFavorite) {
            // Remove product from favorites
            setIsFavorite(false)
            updatedFavorites = favorites.filter(item => item.productCode !== product.productCode);
        } else {
            // Add product to favorites
            setIsFavorite(true)
            updatedFavorites = [...favorites, { productCode: product.productCode, type: activeType, peaces: 1 }];
        }

        // Update state and save in cookies
        setFavorites(updatedFavorites);
        Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 365 });
    };


    return(
        product !== null &&
        <div className="ProductPageContainer">
            <div className="mainInfoCont">
                <div className="textInfo">
                    <div className="nameCont">
                        <p className="name">{product.name}</p>

                        <button className="starBtn" onClick={()=>toggleFavorite()}>
                            {isFavorite ?
                                <FaStar className="starIcon"/> :
                                <FaRegStar className="starIcon"/>
                            }
                        </button>

                    </div>
                    <p className="prg">{product.description}</p>

                    <div className="imageContainer tabletV">
                        <img className="img" src={product.image} alt=""/>
                    </div>

                    <p className="header">Варианты</p>

                    {product.info &&
                        <div className="infoCont">
                            {product.info[0] &&
                                <div className="headersCont">
                                    {product.info[0].color && <span>цвет</span>}
                                    {product.info[0].article && <span>номер артикула</span>}
                                    {product.info[0].volume && <span>объём</span>}
                                    {product.info[0].peacesInBox && <span>штук в коробке</span>}
                                </div>
                            }
                            {product.info.length > 0 && product.info.map((item, index)=>{
                                return(
                                    <div className="infoLine">
                                        {item.color && <span>{item.color}</span>}
                                        {item.article && <span>{item.article}</span>}
                                        {item.volume && <span>{item.volume}</span>}
                                        {item.peacesInBox && <span>{item.peacesInBox}</span>}

                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>



                <div className="imageContainer">
                    <img className="img" src={product.image} alt=""/>
                </div>
            </div>

            {product.dsc &&
                <div className="description">
                    <p className="header">Описание</p>

                    <p className="prg">{product.dsc}</p>
                </div>
            }

            {product.use &&
                <div className="useContext">
                    <p className="header">{product.use.header}</p>

                    <div className="typesCont">
                        {product.use.types.map((item, index)=>{
                            return(
                                <div className="type" key={index}>
                                    <div className="imgBlock">
                                        <img src={item.img} className="typeImage" alt=""/>

                                    </div>
                                    <p className="text">{item.text}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }


        </div>

    )
}

export default ProductPage;
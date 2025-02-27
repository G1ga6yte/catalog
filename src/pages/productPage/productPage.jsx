import React, {useEffect, useState} from 'react';
import "./ProductPage.scss"
import {useCartContext} from "../../cartContext";
import {useNavigate} from "react-router";
import Cookies from "js-cookie";
import {FaRegStar, FaStar} from "react-icons/fa";
import {MasterProducts} from "../../products/master";
import {InterProducts} from "../../products/inter";
import {RangersProducts} from "../../products/rangers";
import {BraytProducts} from "../../products/brayt";

function ProductPage() {
    const {product, setLoading, activeType, setActiveType, setProduct} = useCartContext()
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        let prodCode = Cookies.get("Product");
        let type = Cookies.get("Type");
        if (prodCode && type) {
            let theProduct;
            if (type === "Master") {
                theProduct = MasterProducts.filter((el)=> el.productCode === prodCode)
            } else if (type === "Inter") {
                theProduct = InterProducts.filter((el)=> el.productCode === prodCode)
            } else if (type === "Rangers") {
                theProduct = RangersProducts.filter((el)=> el.productCode === prodCode)
            }  else if (type === "Brayt") {
                theProduct = BraytProducts.filter((el)=> el.productCode === prodCode)
            }
            setProduct(theProduct[0])
        } else {
            navigate("/")
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);


    // Load favorites from cookies on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Check if product is in favorites

    // Toggle favorite (Add or Remove)
    const toggleFavorite = (article, color, volume) => {
        let updatedFavorites;
        const isFavorite = favorites.some(item => item.article === article);

        if (isFavorite) {
            // Remove product from favorites
            updatedFavorites = favorites.filter(item => item.article !== article);
        } else {
            // Add product to favorites
            updatedFavorites = [...favorites, {productCode: product.productCode, image: product.image, article: article, type: activeType, peaces: 1, color: color, volume: volume, name: product.name, price: product.price, newPrice: product.newPrice, sellingPrice: product.sellingPrice}];
        }

        // Update state and save in cookies
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const handleChangeRoute = (type, route) => {
        setLoading(true)
        setActiveType(type)
        navigate(route)
        localStorage.setItem('Type', type);
    }


    return (
        product !== null &&
        <div className="ProductPageContainer">
            <div className="mainInfoCont">
                <div className="textInfo">
                    <div className="nameCont">
                        <p className="name">{product.name}</p>

                        <button onClick={()=>handleChangeRoute("Inter", "/favorites")} className="favoriteBtn">
                            <FaStar  className="favoriteIcon"/>
                            Фавориты
                        </button>
                    </div>
                    <p className="prg">{product.description}</p>

                    <div className="imageContainer tabletV">
                        <img className="img" src={product.image} alt=""/>
                    </div>

                    <p className="header">Варианты</p>

                    {product.info &&
                        <div className="infoCont">
                            <table className="infoTable">
                                {product.info[0] &&
                                    <tr className="headersCont">
                                        {product.info[0].color && <th>цвет</th>}
                                        {product.info[0].var && <th> </th>}
                                        {product.info[0].article && <th>номер артикула</th>}
                                        {product.info[0].volume && <th>объём</th>}
                                        {product.info[0].weight && <th>вес</th>}
                                        {product.info[0].peacesInBox && <th>штук в коробке</th>}
                                        <th> </th>
                                    </tr>
                                }
                                {product.info.length > 0 && product.info.map((item, index) => {
                                    const isFavorite = favorites.some(fav => fav.article === item.article);


                                    return (
                                        <tr key={index} className="infoLine">
                                            {item.color && <td>{item.color}</td>}
                                            {item.var && <td>{item.var}</td>}
                                            {item.article && <td>{item.article}</td>}
                                            {item.volume && <td>{item.volume}</td>}
                                            {item.weight && <td>{item.weight}</td>}
                                            {item.peacesInBox && <td>{item.peacesInBox}</td>}
                                            <td>
                                                <button className="starBtn" onClick={() => toggleFavorite(item.article, item.color, item.volume)}>
                                                    {isFavorite ?
                                                        <FaStar className="starIcon"/> :
                                                        <FaRegStar className="starIcon"/>
                                                    }
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </table>
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
                        {product.use.types.map((item, index) => {
                            return (
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
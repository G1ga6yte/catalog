import React, {useEffect, useState} from 'react';
import './Products.scss';
import {useCartContext} from "../../cartContext";
import {MasterProducts} from "../../products/master";
import {Products} from "../../products/products.js";
import { FaBookmark } from "react-icons/fa6";
import {useNavigate} from "react-router";
import {InterProducts} from "../../products/inter";
import {FaRegStar, FaStar} from "react-icons/fa";
import Cookies from "js-cookie";

function ProductsCont() {
    const {loading, setLoading, activeType, setProduct, setActiveType, authenticated} = useCartContext()
    const [activeProducts, setActiveProducts] = useState([])
    const navigate = useNavigate()
    const [favorites, setFavorites] = useState([])

    const toggleFavorite = (product) => {
        let updatedFavorites = [...favorites]; // Make a copy of the current favorites
        let status = true;

        // Check if all items in product.info are already in favorites
        product.info.forEach(item => {
            const isFav = favorites.some(fav => fav.article === item.article);
            if (!isFav) {
                status = false;
            }
        });

        if (status) {
            // If all items are favorites, remove them from favorites
            product.info.forEach(item => {
                updatedFavorites = updatedFavorites.filter(el => el.article !== item.article);
            });
        } else {
            // If not all items are favorites, add them to favorites
            product.info.forEach(item => {
                const isFav = favorites.some(fav => fav.article === item.article);
                if (!isFav) {
                    updatedFavorites.push({
                        productCode: product.productCode,
                        image: product.image,
                        article: item.article,
                        type: activeType,
                        peaces: 1,
                        color: item.color,
                        volume: item.volume,
                        name: product.name,
                        price: product.price,
                        newPrice: product.newPrice,
                        sellingPrice: product.sellingPrice
                    });
                }
            });
        }

        // Update state once after processing the entire list
        setFavorites(updatedFavorites);

        // Save to localStorage after state update
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };


    useEffect(() => {
        const type = Cookies.get("Type");


        if (type === "Master"){
            setActiveProducts(MasterProducts)
        } else if (type === "Inter"){
            setActiveProducts(InterProducts)
        } else {
            setActiveProducts(InterProducts)
        }

        setTimeout(()=>{
            setLoading(false)
        }, 500)

        let favCookie = localStorage.getItem("favorites");
        if (favCookie) {
            setFavorites(JSON.parse(favCookie));
        }


    }, [activeType, setActiveType]);

    const handleGoToProduct = (product) => {
        setLoading(true)
        navigate(`/product/${product.productCode}`)
        setProduct(product)
        Cookies.set("Product", product.productCode)
    }

    const handleChangeRoute = (type, route) => {
        setLoading(true)
        setActiveType(type)
        navigate(route)
        Cookies.set('Type', type, { expires: 365 });
    }



    return (
        <div className='ProductsContainer'>
            <div className="headContainer">
                <button onClick={()=>handleChangeRoute(activeType, "/favorites")} className="favoriteBtn">
                    <FaStar  className="favoriteIcon"/>
                    Фавориты
                </button>
            </div>
            <div className="cont">

                <div className="desktopType">
                    {activeProducts.map((product, index) => {
                            let sale =Math.floor((Number(product.price)-Number(product.newPrice))/(Number(product.price)/100) )
                            let active = true;
                            product.info.forEach((item, index) => {
                                const isFavorite = favorites.some(prod => prod.article === item.article);
                                if (!isFavorite){
                                    active = false
                                }
                            })
                        return (
                                <div onClick={()=>handleGoToProduct(product)} key={index} className="productCard">

                                    {product.newPrice.length > 0 && <div className="saleMark">
                                        <FaBookmark className="markIcon" />
                                        <p className="salePrg">{sale}%</p>
                                    </div>}

                                    {product.new ?
                                        <div className="newMark">
                                            <p>NEW</p>
                                        </div> : ""
                                    }

                                    <div className="imgBlock">
                                        <button className="addBtn" onClick={(e)=>{
                                            e.stopPropagation()
                                            toggleFavorite(product)
                                        }}>
                                            {active ?
                                                <FaStar className="favoriteIcon"/>
                                                :
                                                <FaRegStar className="favoriteIcon"/>
                                            }

                                        </button>
                                        <img className="img" src={product.image} alt=""/>
                                    </div>

                                    <div className="textBlock marginB6">
                                        <div className="nameCont">
                                            <p className="name">{product.name}</p>
                                        </div>



                                        {authenticated ?
                                            <div className="priceCont">
                                                {product.newPrice.length > 0 ?
                                                    <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :
                                                    <p className="price">{product.price}.00 <span>AMD</span></p>
                                                }
                                                {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}
                                            </div>
                                            :
                                            <div className="priceCont">
                                                {product.sellingPrice.length && <p className="price">{product.sellingPrice}.00 <span>AMD</span></p>}
                                            </div>
                                        }


                                    </div>

                                    <div className="textBlock marginB12">
                                        <p className="prg">{product.description}</p>

                                    </div>

                                    {authenticated &&
                                        <div className="textBlock marginB6">
                                            <span className="miniHeader">Цена продажи:</span>
                                            <span className="sellingPrice">{product.sellingPrice}.00 <span>AMD</span></span>
                                        </div>
                                    }


                                    {product.colors ?
                                        <div className="colorsCont">
                                            <span className="miniHeader">Цветы:</span>
                                            <div className="colors">
                                                {product.colors.map((color, index)=>{
                                                    return(
                                                        <div key={index} style={{
                                                            backgroundColor: color
                                                        }} className="colorBlock">
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div> : ""
                                    }
                                </div>
                            )
                    })}
                </div>


                <div className="phoneType">
                    <div className="productsLine">
                        {activeProducts.map((product, index) => {
                            if (index % 2 === 0) {
                                let sale =Math.floor((Number(product.price)-Number(product.newPrice))/(Number(product.price)/100) )
                                let active = true;
                                product.info.forEach((item, index) => {
                                    const isFavorite = favorites.some(prod => prod.article === item.article);
                                    if (!isFavorite){
                                        active = false
                                    }
                                })
                                return (
                                    <div  onClick={()=>handleGoToProduct(product)} key={index} className="productCard">

                                        {product.newPrice.length > 0 && <div className="saleMark">
                                            <FaBookmark className="markIcon" />
                                            <p className="salePrg">{sale}%</p>
                                        </div>}

                                        {product.new ?
                                            <div className="newMark">
                                                <p>NEW</p>
                                            </div> : ""
                                        }

                                        <div className="imgBlock">
                                            <button className="addBtn" onClick={(e)=>{
                                                e.stopPropagation()
                                                toggleFavorite(product)
                                            }}>
                                                {active ?
                                                    <FaStar className="favoriteIcon"/>
                                                    :
                                                    <FaRegStar className="favoriteIcon"/>
                                                }

                                            </button>
                                            <img className="img" src={product.image} alt=""/>
                                        </div>

                                        <div className="textBlock marginB12">
                                            <div className="nameCont">
                                                <p className="name">{product.name}</p>
                                                <p className="prg">{product.description}</p>

                                                {authenticated ?
                                                    <div className="mobilePriceCont priceCont">
                                                        {product.newPrice.length > 0 ?
                                                            <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :
                                                            <p className="price">{product.price}.00 <span>AMD</span></p>
                                                        }
                                                        {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}
                                                    </div>
                                                    :
                                                    <div className="mobilePriceCont priceCont">
                                                        {product.sellingPrice.length && <p className="price">{product.sellingPrice}.00 <span>AMD</span></p>}
                                                    </div>
                                                }

                                            </div>

                                            {/*<div className="priceCont">*/}
                                            {/*    {product.newPrice.length > 0 ?*/}
                                            {/*        <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :*/}
                                            {/*        <p className="price">{product.price}.00 <span>AMD</span></p>*/}
                                            {/*    }*/}
                                            {/*    {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}*/}
                                            {/*</div>*/}

                                        </div>

                                        {authenticated &&
                                            <div className="textBlock marginB6">
                                                <span className="miniHeader">Цена продажи:</span>
                                                <span className="sellingPrice">{product.sellingPrice}.00 <span>AMD</span></span>
                                            </div>
                                        }

                                        {product.colors ?
                                            <div className="colorsCont">
                                                <span className="miniHeader">Цветы:</span>
                                                <div className="colors">
                                                    {product.colors.map((color, index)=>{
                                                        return(
                                                            <div key={index} style={{
                                                                backgroundColor: color
                                                            }} className="colorBlock">
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div> : ""
                                        }
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <div className="productsLine">
                        {activeProducts.map((product, index) => {
                            if (index % 2 === 1) {
                                let sale =Math.floor((Number(product.price)-Number(product.newPrice))/(Number(product.price)/100) )
                                let active = true;
                                product.info.forEach((item, index) => {
                                    const isFavorite = favorites.some(prod => prod.article === item.article);
                                    if (!isFavorite){
                                        active = false
                                    }
                                })
                                return (
                                    <div  onClick={()=>handleGoToProduct(product)} key={index} className="productCard">

                                        {product.newPrice.length > 0 && <div className="saleMark">
                                            <FaBookmark className="markIcon" />
                                            <p className="salePrg">{sale}%</p>
                                        </div>}

                                        {product.new ?
                                            <div className="newMark">
                                                <p>NEW</p>
                                            </div> : ""
                                        }
                                        <div className="imgBlock">
                                            <button className="addBtn" onClick={(e)=>{
                                                e.stopPropagation()
                                                toggleFavorite(product)
                                            }}>
                                                {active ?
                                                    <FaStar className="favoriteIcon"/>
                                                    :
                                                    <FaRegStar className="favoriteIcon"/>
                                                }

                                            </button>
                                            <img className="img" src={product.image} alt=""/>
                                        </div>

                                        <div className="textBlock marginB12">
                                            <div className="nameCont">
                                                <p className="name">{product.name}</p>
                                                <p className="prg">{product.description}</p>

                                                {authenticated ?
                                                    <div className="mobilePriceCont priceCont">
                                                        {product.newPrice.length > 0 ?
                                                            <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :
                                                            <p className="price">{product.price}.00 <span>AMD</span></p>
                                                        }
                                                        {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}
                                                    </div>
                                                    :
                                                    <div className="mobilePriceCont priceCont">
                                                        {product.sellingPrice.length && <p className="price">{product.sellingPrice}.00 <span>AMD</span></p>}
                                                    </div>
                                                }

                                            </div>

                                            {/*<div className="priceCont">*/}
                                            {/*    {product.newPrice.length > 0 ?*/}
                                            {/*        <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :*/}
                                            {/*        <p className="price">{product.price}.00 <span>AMD</span></p>*/}
                                            {/*    }*/}
                                            {/*    {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}*/}
                                            {/*</div>*/}

                                        </div>

                                        {authenticated &&
                                            <div className="textBlock marginB6">
                                                <span className="miniHeader">Цена продажи:</span>
                                                <span className="sellingPrice">{product.sellingPrice}.00 <span>AMD</span></span>
                                            </div>
                                        }

                                        {product.colors ?
                                            <div className="colorsCont">
                                                <span className="miniHeader">Цветы:</span>
                                                <div className="colors">
                                                    {product.colors.map((color, index)=>{
                                                        return(
                                                            <div key={index} style={{
                                                                backgroundColor: color
                                                            }} className="colorBlock">
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div> : ""
                                        }
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ProductsCont;
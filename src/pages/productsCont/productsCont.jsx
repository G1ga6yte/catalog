import React, {useEffect, useState} from 'react';
import './Products.scss';
import {useCartContext} from "../../cartContext";
import {MasterProducts} from "../../products/master";
import {Products} from "../../products/products.js";
import { FaBookmark } from "react-icons/fa6";
import {useNavigate} from "react-router";
import {InterProducts} from "../../products/inter";

function ProductsCont() {
    const {loading, setLoading, activeType, setProduct, setActiveType} = useCartContext()
    const [activeProducts, setActiveProducts] = useState([])
    const navigate = useNavigate()

    // useEffect(() => {
    //     setActiveProducts([])
    //     Products.forEach((product, index) => {
    //         if (product.mark === activeType) {
    //             setActiveProducts(activeProducts => [...activeProducts, product])
    //         }
    //         if (index === activeProducts.length - 1) {
    //             setLoading(false)
    //         }
    //     })
    //     setLoading(false)
    //
    //
    // }, [])


    useEffect(() => {
        if (activeType === "Master"){
            setActiveProducts(MasterProducts)
        }
        if (activeType === "Inter"){
            setActiveProducts(InterProducts)
        }
        setTimeout(()=>{
            setLoading(false)
        }, 500)


    }, [activeType, setActiveType]);

    const handleGoToProduct = (product) => {
        setLoading(true)
        navigate(`/product/${product.productCode}`)
        setProduct(product)
    }

    return (
        <div className='ProductsContainer'>
            <div className="cont">

                <div className="desktopType">
                    {activeProducts.map((product, index) => {
                        let sale =Math.floor((Number(product.price)-Number(product.newPrice))/(Number(product.price)/100) )
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
                                        <img className="img" src={product.image} alt=""/>
                                    </div>

                                    <div className="textBlock marginB6">
                                        <div className="nameCont">
                                            <p className="name">{product.name}</p>
                                        </div>

                                        <div className="priceCont">
                                            {product.newPrice.length > 0 ?
                                                <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :
                                                <p className="price">{product.price}.00 <span>AMD</span></p>
                                            }
                                            {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}
                                        </div>

                                    </div>

                                    <div className="textBlock marginB12">
                                        <p className="prg">{product.description}</p>

                                    </div>

                                    <div className="textBlock marginB6">
                                        <span className="miniHeader">Цена продажи:</span>
                                        <span className="sellingPrice">{product.sellingPrice}.00 <span>AMD</span></span>
                                    </div>

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
                                            <img className="img" src={product.image} alt=""/>

                                        </div>

                                        <div className="textBlock marginB12">
                                            <div className="nameCont">
                                                <p className="name">{product.name}</p>
                                                <p className="prg">{product.description}</p>

                                                <div className="mobilePriceCont priceCont">
                                                    {product.newPrice.length > 0 ?
                                                        <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :
                                                        <p className="price">{product.price}.00 <span>AMD</span></p>
                                                    }
                                                    {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}

                                                </div>

                                            </div>

                                            {/*<div className="priceCont">*/}
                                            {/*    {product.newPrice.length > 0 ?*/}
                                            {/*        <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :*/}
                                            {/*        <p className="price">{product.price}.00 <span>AMD</span></p>*/}
                                            {/*    }*/}
                                            {/*    {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}*/}
                                            {/*</div>*/}

                                        </div>

                                        <div className="textBlock marginB6">
                                            <span className="miniHeader">Цена продажи:</span>
                                            <span className="sellingPrice">{product.sellingPrice}.00 <span>AMD</span></span>
                                        </div>

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
                                            <img className="img" src={product.image} alt=""/>

                                        </div>

                                        <div className="textBlock marginB12">
                                            <div className="nameCont">
                                                <p className="name">{product.name}</p>
                                                <p className="prg">{product.description}</p>

                                                <div className="mobilePriceCont priceCont">
                                                    {product.newPrice.length > 0 ?
                                                        <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :
                                                        <p className="price">{product.price}.00 <span>AMD</span></p>
                                                    }
                                                    {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}

                                                </div>

                                            </div>

                                            {/*<div className="priceCont">*/}
                                            {/*    {product.newPrice.length > 0 ?*/}
                                            {/*        <p className="newPrice">{product.newPrice}.00 <span>AMD</span></p> :*/}
                                            {/*        <p className="price">{product.price}.00 <span>AMD</span></p>*/}
                                            {/*    }*/}
                                            {/*    {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}*/}
                                            {/*</div>*/}

                                        </div>

                                        <div className="textBlock marginB6">
                                            <span className="miniHeader">Цена продажи:</span>
                                            <span className="sellingPrice">{product.sellingPrice}.00 <span>AMD</span></span>
                                        </div>

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
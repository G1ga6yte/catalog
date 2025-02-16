import React, {useEffect, useState} from 'react';
import './Products.scss';
import {useCartContext} from "../../cartContext";
import {Products} from "../../products/products.js";
import { FaBookmark } from "react-icons/fa6";

function ProductsCont() {
    const {loading, setLoading, activeType} = useCartContext()
    const [activeProducts, setActiveProducts] = useState([])


    useEffect(() => {
        setActiveProducts([])
        Products.forEach((product, index) => {
            if (product.mark === activeType) {
                setActiveProducts(activeProducts => [...activeProducts, product])
            }
            if (index === activeProducts.length - 1) {
                setLoading(false)
            }
        })
        setLoading(false)


    }, [])

    return (
        <div className='ProductsContainer'>
            <div className="cont">

                <div className="desktopType">
                    {activeProducts.map((product, index) => {
                        let sale =Math.floor((Number(product.price)-Number(product.newPrice))/(Number(product.price)/100) )
                            return (
                                <div  key={index} className="productCard">

                                    {product.newPrice.length > 0 && <div className="saleMark">
                                        <FaBookmark className="markIcon" />
                                        <p className="salePrg">{sale}%</p>
                                    </div>}

                                    {product.new ?
                                        <div className="newMark">
                                            <p>NEW</p>
                                        </div> : ""
                                    }
                                    <img className="img" src={product.image} alt=""/>

                                    <div className="textBlock">
                                        <div className="nameCont">
                                            <p className="name">{product.name}</p>
                                            <p className="prg">{product.description}</p>
                                        </div>

                                        <div className="priceCont">
                                            {product.newPrice.length > 0 ?
                                                <p className="newPrice">{product.newPrice}.00 Դրամ</p> :
                                                <p className="price">{product.price}.00 Դրամ</p>
                                            }
                                            {product.newPrice.length > 0 && <p className="oldPrice">{product.price}.00 </p>}
                                        </div>

                                    </div>
                                </div>
                            )
                    })}
                </div>


                <div className="phoneType">
                    <div className="productsLine">
                        {activeProducts.map((product, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <div key={index} className="productCard">
                                        <p className="name">{product.name}</p>
                                        <img className="img" src={product.image} alt=""/>
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <div className="productsLine">
                        {activeProducts.map((product, index) => {
                            if (index % 2 === 1) {
                                return (
                                    <div key={index} className="productCard">
                                        <p className="name">{product.name}</p>


                                        <img className="img" src={product.image} alt=""/>
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
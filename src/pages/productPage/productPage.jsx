import React, {useEffect} from 'react';
import "./ProductPage.scss"
import {useCartContext} from "../../cartContext";
import {useNavigate} from "react-router";

function ProductPage(){
    const {product, setLoading} = useCartContext()
    const navigate = useNavigate();

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

    return(
        product !== null &&
        <div className="ProductPageContainer">
            <div className="mainInfoCont">
                <div className="textInfo">
                    <p className="name">{product.name}</p>
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
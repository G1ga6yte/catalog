import React, {useEffect, useState} from 'react';
import './Favorites.scss';
import Cookies from "js-cookie";
import {InterProducts} from "../../products/inter";
import {useCartContext} from "../../cartContext";
import {MasterProducts} from "../../products/master";
import emailjs from 'emailjs-com';
import {IoTrashOutline} from "react-icons/io5";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import { BsFillSendCheckFill } from "react-icons/bs";
import {useNavigate} from "react-router";
import { FaHistory } from "react-icons/fa";

function Favorites() {
    const {setLoading, authenticated, setLoginCont, accountInfo} = useCartContext()
    const [favorites, setFavorites] = useState([]);
    const [sum, setSum] = useState(0);
    const [sellingSum, setSellingSum] = useState(0);
    const [btnLoading, setBtnLoading] = useState(false);
    const navigate = useNavigate();
    const [sendDialog, setSendDialog] = useState(false);
    const [clearingDialog, setClearingDialog] = useState(false);
    const [okDialog, setOkDialog] = useState(false);

    const fetchProducts = async () => {
        const favoritesCookie =  localStorage.getItem("favorites");

        if (favoritesCookie) {
            let fav = JSON.parse(favoritesCookie);
            await setFavorites(fav);
        } else {
            await localStorage.setItem("favorites", JSON.stringify([]));
        }
    }

    const getDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-based
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0"); // 24-hour format
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false)
        }, 500)
        fetchProducts()


    }, [authenticated, sendDialog, clearingDialog, btnLoading]);

    const handleSendEmail = () => {
        setBtnLoading(true);
        if (authenticated) {
            setSendDialog(false)

                const newFavorites = favorites.map(product => {
                    if(product.newPrice.length){
                        product.price = product.newPrice
                    }
                    product.total = Number(product.price)*Number(product.peaces)

                    return product
                })


                const templateParams = {
                    user_email: accountInfo.email,
                    products: {
                        fullPrice: sum
                    },
                    from_name: accountInfo.name,
                    account: {
                        name: accountInfo.name,
                        email: accountInfo.email,
                        address: accountInfo.address,
                        tel: accountInfo.tel
                    },
                    favorites: {}
                };

                newFavorites.forEach((product, index) => {
                    templateParams.favorites[`favorite${index}`] = product;
                })

                emailjs.send('service_u0154kq', 'template_08vv9p9', templateParams, 'yUg1XedfmXIGU1mtY')
                    .then((response) => {
                        console.log('Email successfully sent!', response.status, response.text);
                        setOkDialog(true)
                        const history = localStorage.getItem("history")
                        let historyArr = []
                        if(history){
                            historyArr = JSON.parse(history);
                        }
                        if (historyArr.length > 2) {
                            historyArr.pop()
                        }
                        historyArr.unshift({
                            order: newFavorites,
                            date: getDate(),
                            sum: sum
                        })
                        localStorage.setItem("history", JSON.stringify(historyArr))

                        setTimeout(()=>{
                            setOkDialog(false)
                            navigate("/")
                            setBtnLoading(false)
                        }, 2000)
                    }, (err) => {
                        setBtnLoading(false)
                        alert("Ошибка! Заказ не отправлен. Свяжитесь с нами!")
                        console.error('Failed to send email. Error:', err);
                    });
        } else {
            setLoginCont(true)
            setBtnLoading(false)
        }


    }

    const handleChangePeaces = async (peaces, article) => {
        const savedFavorites = localStorage.getItem("favorites");

        if (savedFavorites) {
            let savedFav = await JSON.parse(savedFavorites)
            let newFav = []
            savedFav.forEach((item) => {
                if (item.article === article) {
                    item.peaces = String(peaces)
                }
                newFav.push(item);
            });

            await localStorage.setItem("favorites", JSON.stringify(newFav));
        }

        await fetchProducts()
    }

    const handleRemoveItem = async (article) => {
        const savedFavorites = localStorage.getItem("favorites");

        if (savedFavorites) {
            let savFav = await JSON.parse(savedFavorites)
            let newFav = []
            savFav.forEach((item) => {
                if (item.article !== article) {
                    newFav.push(item);
                }
            })
            await localStorage.setItem("favorites", JSON.stringify(newFav));
        }

        await fetchProducts()
    }

    useEffect(() => {
        if (favorites.length) {
            let summa = 0
            favorites.forEach(item => {
                if (item.newPrice) {
                    summa = summa + Number(item.newPrice) * Number(item.peaces);
                } else {
                    summa = summa + Number(item.peaces) * Number(item.price);
                }
            })
            setSum(summa)
        }
        if (favorites.length) {
            let summa = 0
            favorites.forEach(item => {
                    summa = summa + Number(item.sellingPrice) * Number(item.peaces);
            })
            setSellingSum(summa)
        }
    }, [favorites, setFavorites, authenticated]);

    const handleClear = async () => {
        await setFavorites([])
        await localStorage.setItem("favorites", JSON.stringify([]));
        setClearingDialog(false)
    }

    const handleChangeRoute = (route) => {
        setLoading(true)
        navigate(route)
    }



    return (
        <div className='FavoritesContainer'>


            {authenticated &&
                <button onClick={()=>{
                    handleChangeRoute("/history")
                }} className="historyBtn"><FaHistory className="historyIcon" />
                </button>
            }



            {okDialog && <div className="okDialogCont">
                <div onClick={()=>setOkDialog(false)} className="backgroundBlock"></div>

                <div className="dialogBlock">
                    <p className="header">Заказ успешно отправлен!</p>

                    <BsFillSendCheckFill  className="checkIcon"/>
                </div>
            </div>}

            {sendDialog && <div className="dialogCont">
                <div className="backgroundBlock" onClick={() => setSendDialog(false)}></div>
                <div className="dialogBlockFav">
                    <p className="prg">Вы уверены что хотите отправить заказ?</p>
                    <div className="btnsCont">
                        <button onClick={() => setSendDialog(false)} className="cancelBtn">Отмена</button>
                        <button onClick={()=>handleSendEmail()} className="applyBtn">Отправить</button>
                    </div>
                </div>
            </div>}

            {clearingDialog && <div className="dialogCont">
                <div className="backgroundBlock" onClick={() => setClearingDialog(false)}></div>
                <div className="dialogBlockFav">
                    <p className="prg">Вы уверены что хотите очистить весь список?</p>
                    <div className="btnsCont">
                        <button onClick={() => setClearingDialog(false)} className="cancelBtn">Отмена</button>
                        <button onClick={handleClear} className="applyBtn">Очистить</button>
                    </div>
                </div>
            </div>}

            {favorites.length > 0 ?
                <div className="tableCont">
                    <table className="table">
                        <thead>
                        <tr className="tr">
                            <th className="numberTH">№</th>
                            <th>Артикул</th>
                            <th className="firstTH">Продукт</th>
                            <th>Название</th>
                            <th>Штук</th>
                            <th>Цена</th>
                            <th>Итог</th>
                            <th></th>
                        </tr>
                        </thead>
                        {favorites.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.article}<br/>({item.volume})<br/>({item.color})
                                    </td>
                                    <td><img className="itemImg" src={item.image} alt=""/></td>
                                    <td>{item.name}</td>
                                    <td className="inputTD"><input
                                        type="text"
                                        className="peacesInput"
                                        value={String(item.peaces)}
                                        onChange={(e) => handleChangePeaces(e.target.value, item.article)}
                                    /></td>
                                    {authenticated ?
                                        <td>{item.newPrice.length ? Number(item.newPrice) : Number(item.price)}.00</td>
                                        :
                                        <td>{item.sellingPrice.length && item.sellingPrice}.00</td>
                                    }
                                    {authenticated ?
                                        <td>{item.newPrice.length ? Number(item.newPrice) * Number(item.peaces) : Number(item.price) * Number(item.peaces)}.00</td>
                                        :
                                        <td>{item.sellingPrice.length && Number(item.sellingPrice)*Number(item.peaces)}.00</td>
                                    }
                                    <td className="removeTD">
                                        <button onClick={() => {
                                            handleRemoveItem(item.article)
                                        }} className="removeBtn">
                                            <IoTrashOutline className="removeIcon"/>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr className="endLine">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{fontWeight: 600}}>Обший итог:</td>
                            {authenticated ?
                                <td style={{fontWeight: 600}}>{sum}.00</td>
                                :
                                <td style={{fontWeight: 600}}>{sellingSum}.00</td>
                            }
                            <td></td>
                        </tr>
                    </table>
                </div>
                :
                <div className="prgCont">
                    <p className="prg">Здесь пока что пусто. <br/> Нажмите на звездочку что бы добовить в Избранные!</p>
                </div>
            }

            {favorites.length > 0 &&
                <div className="buttonsCont">
                    <button onClick={() => setClearingDialog(true)} className="sendBtn clearBtn">Очистить лист</button>
                    <button onClick={() => {
                        if (authenticated) {
                            setSendDialog(true)
                        } else {
                            setSendDialog(true)
                            setLoginCont(true)
                        }
                    }} disabled={btnLoading} className="sendBtn">{btnLoading ?
                        <AiOutlineLoading3Quarters className="loadingIcon"/> : "Отправить заказ"}</button>
                </div>
            }
        </div>
    );
}

export default Favorites;
import React, {useEffect, useState} from 'react';
import './Favorites.scss';
import Cookies from "js-cookie";
import {InterProducts} from "../../products/inter";
import {useCartContext} from "../../cartContext";
import {MasterProducts} from "../../products/master";
import emailjs from 'emailjs-com';
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Favorites() {
    const {setLoading, authenticated, setLoginCont} = useCartContext()
    const [favorites, setFavorites] = useState([]);
    const [sum, setSum] = useState(0);
    const [btnLoading, setBtnLoading] = useState(false);



    const fetchProducts = async ()=> {
        const favoritesCookie = await Cookies.get("favorites");

        if (favoritesCookie) {
            let fav = JSON.parse(favoritesCookie);
          await  setFavorites(fav);
        } else {
            await  Cookies.set("favorites", JSON.stringify([]), {expires: 365});
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false)
        }, 500)
        fetchProducts()

    }, []);

    const handleSendEmail = () => {
        setBtnLoading(true);
        if (authenticated){
            const products = favorites.map(item => {
                return {
                    name: item.name
                }
            }).join(', ');

            const templateParams = {
                user_email: "sargsyan.vache.02@gmail.com",
                products: products,
                from_name: "Vache",
                message: products
            };

            emailjs.send('service_u0154kq', 'template_08vv9p9', templateParams, 'yUg1XedfmXIGU1mtY')
                .then((response) => {
                    console.log('Email successfully sent!', response.status, response.text);
                    alert('Email sent successfully!');
                    setBtnLoading(false)
                }, (err) => {
                    setBtnLoading(false)
                    console.error('Failed to send email. Error:', err);
                });
        } else {
            setLoginCont(true)
            setBtnLoading(false)

        }


    }

    const handleChangePeaces = async (peaces, article) => {
        const savedFavorites = await Cookies.get("favorites");

        if (savedFavorites) {
            let savedFav = await JSON.parse(savedFavorites)
                let newFav = []
                savedFav.forEach((item)=>{
                if (item.article === article) {
                    item.peaces = String(peaces)
                }
                newFav.push(item);
            });

            await  Cookies.set("favorites", JSON.stringify(newFav), {expires: 365});
        }

        await fetchProducts()
    }

    const handleRemoveItem = async (article) => {
        const savedFavorites = await Cookies.get("favorites");

        if(savedFavorites){
            let savFav = await JSON.parse(savedFavorites)
            let newFav = []
            savFav.forEach((item)=>{
                if (item.article !== article) {
                    newFav.push(item);
                }
            })
            await Cookies.set("favorites", JSON.stringify(newFav), {expires: 365});
        }

        await fetchProducts()
    }

    useEffect(() => {
        if (favorites.length){
            let summa = 0
            favorites.forEach(item => {
                if (item.newPrice){
                    summa = summa + Number(item.newPrice)*Number(item.peaces);
                } else {
                    summa = summa + Number(item.peaces)*Number(item.price);
                }
            })
            setSum(summa)
        }
    }, [favorites, setFavorites]);

    return (
        <div className='FavoritesContainer'>
            {favorites.length > 0 ?
                <div className="tableCont">
                    <table className="table">
                        <tr className="tr">
                            <th>Артикул</th>
                            <th className="firstTH">Продукт</th>
                            <th>Название</th>
                            <th>Штук</th>
                            <th>Цена</th>
                            <th>Итог</th>
                            <th></th>
                        </tr>
                        {favorites.map((item, index) => {
                            return (
                                <tr key={index}>
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
                                    <td>{item.newPrice.length ? Number(item.newPrice) : Number(item.price)}.00</td>
                                    <td>{item.newPrice.length ? Number(item.newPrice) * Number(item.peaces) : Number(item.price) * Number(item.peaces)}.00</td>
                                    <td className="removeTD">
                                        <button onClick={()=>{handleRemoveItem(item.article)}} className="removeBtn">
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
                            <td style={{fontWeight: 600}}>Обший итог:</td>
                            <td style={{fontWeight: 600}}>{sum}.00</td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                :
                <div className="prgCont">
                    <p className="prg">Здесь пока что пусто. <br/> Нажмите на звездочку что бы добовить в Избранные!</p>
                </div>
            }

            <div className="buttonsCont">

                <button className="sendBtn clearBtn">Очистить лист</button>
                {/*"Отправить заказ"*/}
                <button disabled={btnLoading} onClick={handleSendEmail} className="sendBtn">{btnLoading ? <AiOutlineLoading3Quarters className="loadingIcon"/> : "Отправить заказ"}</button>
            </div>
        </div>
    );
}

export default Favorites;
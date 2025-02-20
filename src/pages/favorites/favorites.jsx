import React, {useEffect, useState} from 'react';
import './Favorites.scss';
import Cookies from "js-cookie";
import {InterProducts} from "../../products/inter";
import {useCartContext} from "../../cartContext";
import {MasterProducts} from "../../products/master";
import emailjs from 'emailjs-com';

function Favorites() {
    const {setLoading} = useCartContext()
    const [favorites, setFavorites] = useState([]);
    const [sum, setSum] = useState(0);

    const HandleChange = (newFavorites) => {
        let summa = 0
        newFavorites.forEach((item, index) => {
            item.newPrice.length ? summa = summa + item.peaces * Number(item.newPrice) :
                summa = summa + item.peaces * Number(item.price)
        })
        setSum(summa)
    }
    useEffect(() => {
        window.scrollTo(0,0);
        setTimeout(()=>{
            setLoading(false)
        } ,500)
        const favoritesCookie = Cookies.get("favorites");

        if (favoritesCookie) {
            const parsedFavorites = JSON.parse(favoritesCookie);

            // Collect all products in an array before updating state
            let newFavorites = [];

            parsedFavorites.forEach((item) => {
                if (item.type === "Inter") {
                    let product = InterProducts.find((product) => product.productCode === item.productCode);



                    if (product) {
                        let itemInfo = product.info.find((el)=> el.article === item.article)
                        if (itemInfo){
                            newFavorites.push({ ...product, peaces: 1, type: item.type, itemInfo}); // Make sure to create a new object
                        }
                    }
                }
                if (item.type === "Master") {
                    let product = MasterProducts.find((product) => product.productCode === item.productCode);
                    if (product) {
                        let itemInfo = product.info.find((el)=> el.article === item.article)
                        if (itemInfo){
                            newFavorites.push({ ...product, peaces: 1, type: item.type, itemInfo }); // Make sure to create a new object
                        }
                    }
                }
            });

            // Update state once
            console.log(newFavorites)
            setFavorites(newFavorites);
            HandleChange(newFavorites)

        }
    }, []);

    const handleSendEmail = () => {
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
            }, (err) => {
                console.error('Failed to send email. Error:', err);
            });

    }






    return (
        <div className='FavoritesContainer'>
            {favorites.length > 0 ?
                <div className="tableCont">
                    <table className="table" >
                        <tr className="tr">
                            <th>Артикул</th>
                            <th className="firstTH">Продукт</th>
                            <th>Название</th>
                            <th>Штук</th>
                            <th>Цена</th>
                            <th>Итог</th>
                        </tr>
                        {favorites.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.itemInfo.article}<br/>({item.itemInfo.volume})<br/>({item.itemInfo.color})</td>
                                    <td><img className="itemImg" src={item.image} alt=""/></td>
                                    <td>{item.name}</td>
                                    <td>{item.peaces}</td>
                                    <td>{item.newPrice.length ? item.newPrice : item.price}.00</td>
                                    <td>{item.newPrice.length ? Number(item.newPrice)*item.peaces : Number(item.price)*item.peaces}.00</td>
                                </tr>
                            )
                        })}
                        <tr className="endLine">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Обший итог: </td>
                            <td>{sum}.00</td>
                        </tr>
                    </table>
                </div>
                :
                <div className="prgCont">
                    <p className="prg">Здесь пока что пусто. <br/> Нажмите на звездочку что бы добовить в Избранные!</p>
                </div>
            }

            <button onClick={handleSendEmail} className="sendBtn">Отправить заказ</button>
        </div>
    );
}

export default Favorites;
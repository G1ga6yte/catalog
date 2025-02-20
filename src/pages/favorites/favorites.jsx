import React, {useEffect, useState} from 'react';
import './Favorites.scss';
import Cookies from "js-cookie";
import {InterProducts} from "../../products/inter";

function Favorites() {
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
        const favoritesCookie = Cookies.get("favorites");

        if (favoritesCookie) {
            const parsedFavorites = JSON.parse(favoritesCookie);
            console.log(parsedFavorites);

            // Collect all products in an array before updating state
            let newFavorites = [];

            parsedFavorites.forEach((item) => {
                if (item.type === "Inter") {
                    let product = InterProducts.find((product) => product.productCode === item.productCode);
                    if (product) {
                        newFavorites.push({ ...product, peaces: 1, type: item.type }); // Make sure to create a new object
                    }
                }
            });

            // Update state once
            setFavorites(newFavorites);
            HandleChange(newFavorites)

        }
    }, []);







    return (
        <div className='FavoritesContainer'>
            {favorites.length > 0 ?
                <div className="tableCont">
                    <table className="table" >
                        <tr className="tr">
                            <th className="firstTH">Продукт</th>
                            <th>Название</th>
                            <th>Штук</th>
                            <th>Цена</th>
                            <th>Итог</th>
                        </tr>
                        {favorites.map((item, index) => {
                            console.log(item)
                            return (
                                <tr key={index}>
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
                            <td>Обший итог: </td>
                            <td>{sum}</td>
                        </tr>
                    </table>
                </div>
                :
                <div className="prgCont">
                    <p className="prg">Здесь пока что пусто. <br/> Нажмите на звездочку что бы добовить в Избранные!</p>
                </div>
            }
        </div>
    );
}

export default Favorites;
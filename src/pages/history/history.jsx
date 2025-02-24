import React, {useEffect, useState} from 'react';
import './History.scss';
import {useCartContext} from "../../cartContext";
import Cookies from "js-cookie";
import {useNavigate} from "react-router";

function History() {
    const {setLoading, authenticated} = useCartContext()
    const [history, setHistory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false)
        }, 500)
        if (!authenticated) {
            navigate(-1)
        }

        const historyCookie = localStorage.getItem("history")
        if (historyCookie) {
            setHistory(JSON.parse(historyCookie))
        }
    }, [])


    return (
        <div className='HistoryContainer'>
            {history ?
                history.map((order, index) => (
                    <div className="orderCont" key={index}>
                        <div className="dateLine">
                            <p className="prg">{index === 0 && <span>(Последный)</span>} Дата и время заказа:</p>
                            <p className="prg">{order.date}</p>
                        </div>

                        <table className="historyTable">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Артикул</th>
                                    <th>Название</th>
                                    <th>Штук</th>
                                    <th>Цена</th>
                                    <th>Итог</th>

                                </tr>
                            </thead>
                            <tbody>
                            {order.order.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.article}
                                        <br/> ({item.volume})
                                        <br/> ({item.color})
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.peaces}</td>
                                    <td>{item.price}.00</td>
                                    <td>{item.total}.00</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td> <br/> <br/></td>
                                <td></td>
                                <td></td>
                                <td style={{fontWeight: 600}}>Обший итог:</td>
                                <td style={{fontWeight: 600}}>{order.sum}.00</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                ))
                :
                <p className="noneHistory">
                    There is no orders yet!
                </p>
            }
        </div>
    );
}

export default History;
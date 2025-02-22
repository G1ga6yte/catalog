import React, {useEffect, useState} from "react";
import "./History.scss"
import {useCartContext} from "../../cartContext";
import Cookies from "js-cookie";

function History (){
    const {setLoading} = useCartContext()
    const [history, setHistory] = useState({})

    useEffect(()=>{
        window.scrollTo(0, 0)
        setTimeout(()=>{
            setLoading(false)
        }, 500)

        const historyCookie = JSON.parse(Cookies.get("history"))

        if (historyCookie) {
            setHistory(historyCookie)
        }

    }, [])


    return(
        <div className="historyCont">



        </div>
    )
}

export default History;
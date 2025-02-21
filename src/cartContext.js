import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import bcrypt from "bcryptjs";
import {Users} from "./pages/loginCont/users";

const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [activeType, setActiveType] = useState("")
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const state = Cookies.get('Type')
        if (state){
            setActiveType(state)
        }
    }, []);

    useEffect(()=>{
        Cookies.set('Type', activeType, { expires: 365 });
    }, [activeType, setActiveType])



    const [accountInfo, setAccountInfo] = useState(null)
    const [authenticated, setAuthenticated] = useState(false);
    const [loginCont, setLoginCont] = useState(false);

    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            const account = Cookies.get('AccountInfo');
            if(account){
                let accInfo = JSON.parse(account)

                const user = Users.find((user)=>user.username === accInfo.username);

                if (user && accInfo.password === user.password){
                    setAccountInfo(JSON.parse(account));
                    setLoginCont(false);
                    setAuthenticated(true)
                } else {
                    Cookies.set('AccountInfo', JSON.stringify({}));
                }
            }
            setLoading(false)
        }, 500)

    }, [])

    return(<CartContext.Provider value={{
        loading, setLoading, activeType, setActiveType,
        product, setProduct, authenticated, setAuthenticated,
        accountInfo, setAccountInfo, loginCont, setLoginCont
    }}>
        {children}
    </CartContext.Provider> );
};

export const useCartContext = () => {
    return useContext(CartContext);
}
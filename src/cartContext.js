import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';

const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [activeType, setActiveType] = useState("")
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const state = Cookies.get('Type')
        console.log(state)
        if (state){
            setActiveType(state)
        }
    }, []);

    useEffect(()=>{
        Cookies.set('Type', activeType, { expires: 365 });
    }, [activeType, setActiveType])



    return(<CartContext.Provider value={{
        loading, setLoading, activeType, setActiveType,
        product, setProduct
    }}>
        {children}
    </CartContext.Provider> );
};

export const useCartContext = () => {
    return useContext(CartContext);
}
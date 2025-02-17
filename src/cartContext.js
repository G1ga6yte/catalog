import React, {createContext, useContext, useState} from "react";


const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [activeType, setActiveType] = useState("Master")
    const [product, setProduct] = useState(null)



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
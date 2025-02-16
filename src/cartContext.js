import React, {createContext, useContext, useState} from "react";


const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [activeType, setActiveType] = useState("Master")



    return(<CartContext.Provider value={{
        loading, setLoading, activeType, setActiveType
    }}>
        {children}
    </CartContext.Provider> );
};

export const useCartContext = () => {
    return useContext(CartContext);
}
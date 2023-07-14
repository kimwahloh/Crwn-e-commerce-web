import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';

//114  ProductsContext object created with createContext enables components to share and access the products array as part of the shared context
export const ProductsContext = createContext({
    products:[],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };
    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    );
};
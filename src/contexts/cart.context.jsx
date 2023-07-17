import { createContext, useState, useEffect } from "react";

//118 if the exist. cart for this product is empty, then add; if already there, then increase quantity
const addCartItem = (cartItems, productToAdd) => {
    //119 find if castItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    //119 If found, increment quantity
    //119 If found a match (cart item & productToAdd), we want to return a new card item with qty;  if not match, then just return the card item
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    //119 return new array with modified castItems/ new cart item
    //119 It’s a new product- All the cart items doesn’t match the productToAdd, so we make new cartItems (i.e. all the fields of productToAdd + 1)
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext =  createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState (0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    //118 this function triggered when a user clicks on the button "ADD TO CART"
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

};
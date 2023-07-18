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

//123 
const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if qty is equal to 1, if it is, remove that item from the cart
    //如果两个id一样就被remove, filter掉
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    //return back cartitems with matching cart item with reduced qty
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );  
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext =  createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState (0);
    const [cartTotal, setCartTotal] = useState (0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])


    //126 Cart Total
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price , 0)
        setCartTotal (newCartTotal);
    }, [cartItems])

    //118 this function triggered when a user clicks on the button "ADD TO CART"
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    };

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems,cartItemToClear));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartCount, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

};
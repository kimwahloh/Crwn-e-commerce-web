import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

const clearCartItem = (cartItems, cartItemToClear) => 
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

//165 pass the boolean as the value for the payload
export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean); 

//118 this function triggered when a user clicks on the button "ADD TO CART"
//148 
//166 receive (actual action type; newCartItems as the payload)
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems,cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems,cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
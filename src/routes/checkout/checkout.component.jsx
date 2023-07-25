import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

import CartItem from '../../components/cart-item/cart-item.component';

const Checkout = () => {
    const { cartItems, cartTotal} = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map(( CartItem ) => (
                    <CheckoutItem key={CartItem.id} cartItem={CartItem} />
             ))}
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    );
};

export default Checkout;
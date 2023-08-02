import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

//139 if the length >0, render cartItems; else show string it's empty
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
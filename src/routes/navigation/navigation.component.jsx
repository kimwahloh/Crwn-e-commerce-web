import { Fragment, useContext } from "react";

import {Outlet, Link} from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

//108
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';


//106 useContext as a hook tells the component whenever a value inside of the context updates, re-render it
//106 re-render bcz the value inside of the UserContext has updated
const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    
    //108 when there is a current user （就是说user log in了）link 要变sign out
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="Logo"/>
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {currentUser ? (
                    <NavLink as='span' onClick={signOutUser}>
                    SIGN OUT
                    </NavLink>
                ) : (
                <NavLink to='/auth'>
                    SIGN IN
                </NavLink>
                )}
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  };

export default Navigation;
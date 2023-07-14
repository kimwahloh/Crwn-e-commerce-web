import { Fragment, useContext } from "react";

import {Outlet, Link} from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

//108
import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';


//106 useContext as a hook tells the component whenever a value inside of the context updates, re-render it
//106 re-render bcz the value inside of the UserContext has updated
const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    
    //108 when there is a current user （就是说user log in了）link 要变sign out
    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className="Logo"/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {currentUser ? (
                    <span className="nav-link" onClick={signOutUser}>
                    SIGN OUT
                    </span>
                ) : (
                <Link className="nav-link" to='/auth'>
                    SIGN IN
                </Link>
                )}
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    );
  };

export default Navigation;
import React from 'react';
import CartItem from "../cart-item";
import {calculateTotalSum} from "../../utils";
import './style.css'
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function CartModal({ cartItems, onCloseCart, onRemoveFromCart }) {
  const cn = bem('CartModal');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          <h1>Корзина</h1>
          <button className={cn('closeBtn')} onClick={onCloseCart}>
            Закрыть
          </button>
        </div>
        <div className={cn('items')}>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.code} cartItem={cartItem} onRemoveFromCart={onRemoveFromCart} />
          ))}
        </div>
        <div className={cn('totalSum')}>
          <span>
            Итого
          </span>
          <p>{calculateTotalSum(cartItems)}</p>
        </div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cartItems: PropTypes.array.isRequired,
  onCloseCart: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

CartModal.defaultProps = {
  cartItems: [],
  onCloseCart: () => {},
  onRemoveFromCart: () => {},
};

export default React.memo(CartModal);

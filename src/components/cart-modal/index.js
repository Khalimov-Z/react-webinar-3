import React from 'react';
import CartItem from "../cart-item";
import {calculateTotalSum} from "../../utils";
import './style.css'

function CartModal({ cartItems, onCloseCart, onRemoveFromCart }) {
  return (
    <div className='CartModal'>
      <div className='CartModal-content'>
        <div className='CartModal-head'>
          <h1>Корзина</h1>
          <button className='CartModal-closeBtn' onClick={onCloseCart}>
            Закрыть
          </button>
        </div>
        <div className='CartModal-items'>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem.code} cartItem={cartItem} onRemoveFromCart={onRemoveFromCart} />
          ))}
        </div>
        <div className='CartModal-totalSum'>
          <span>
            Итого
          </span>
          <p>{calculateTotalSum(cartItems)}</p>
        </div>
      </div>
    </div>
  );
}


export default CartModal;

import React from "react";
import './style.css'
function CartItem({ cartItem, onRemoveFromCart }) {

  const handleRemoveFromCart = () => {
    onRemoveFromCart(cartItem)
  }
  return (
    <div className='CartItem'>
      <div className='CartItem-code'>{cartItem.code}</div>
      <div className='CartItem-title'>{cartItem.title}</div>
      <div className='CartItem-actions'>
        <div className='CartItem-price'>{cartItem.price}</div>
        <div className='CartItem-quantity'>{`${cartItem.quantity}`}</div>
        <button className='CartItem-removeBtn' onClick={handleRemoveFromCart}>
          Удалить
        </button>
      </div>

    </div>
  );
}

export default CartItem



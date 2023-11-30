import React from "react";
import './style.css';
import {calculateTotalSum, getPluralForm} from '../../utils';

function Controls({ cartItems, onOpenCart }) {
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalSum = calculateTotalSum(cartItems);

  return (
    <div className='Controls'>
      <div className='Controls-cartStatus'>В корзине:</div>
      <div className='Controls-cartContent'>{totalSum > 0 ? `${cartCount} ${getPluralForm(cartCount)} / ${totalSum} ₽` : 'пусто'}</div>
      <button className='Controls-goToButton' onClick={onOpenCart}>
        Перейти
      </button>
    </div>
  );
}


export default React.memo(Controls);

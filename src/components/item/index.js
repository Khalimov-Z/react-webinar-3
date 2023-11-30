import React from "react";
import './style.css';

function Item({ item, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(item);
  };

  return (
    <div className='Item'>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>{item.title}</div>
      <div className='Item-actions'>
        <div className='Item-price'>{item.price}</div>
        <button className='Item-btn' onClick={handleAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}



export default React.memo(Item);

import React from "react";
import './style.css'
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function CartItem(props) {
  const cn = bem('CartItem');

  const handleRemoveFromCart = () => {
    props.onRemoveFromCart(props.cartItem)
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.cartItem.code}</div>
      <div className={cn('title')}>{props.cartItem.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{props.cartItem.price}</div>
        <div className={cn('quantity')}>{`${props.cartItem.quantity}`}</div>
        <button className={cn('removeBtn')} onClick={handleRemoveFromCart}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

CartItem.defaultProps = {
  cartItem: {
    code: 0,
    title: '',
    price: 0,
    quantity: 0,
  },
  onRemoveFromCart: () => {},
};

export default React.memo(CartItem);



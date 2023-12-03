import React from "react";
import './style.css';
import {calculateTotalSum, getPluralForm} from '../../utils';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function Controls({ cartItems, onOpenCart }) {
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalSum = calculateTotalSum(cartItems);
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cartStatus')}>В корзине:</div>
      <div className={cn('cartContent')}>
        {totalSum > 0 ? `${cartCount} ${getPluralForm(cartCount)} / ${totalSum} ₽` : 'пусто'}
      </div>
      <button className={cn('goToButton')} onClick={onOpenCart}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  onOpenCart: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  cartItems: [],
};

export default React.memo(Controls);

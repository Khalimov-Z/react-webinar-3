import React from "react";
import './style.css';
import {calculateTotalSum, formatPrice, getPluralForm} from '../../utils';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";


function Controls({cartCount, cart, onOpenCart }) {
  const totalSum = calculateTotalSum(cart);
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cartStatus')}>В корзине:</div>
      <div className={cn('cartContent')}>
        {cartCount ? `${cartCount} ${getPluralForm(cartCount)} / ${totalSum}` : 'пусто'}
      </div>
      <button className={cn('goToButton')} onClick={onOpenCart}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  cartCount: PropTypes.number.isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  onOpenCart: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  cart: [],
};

export default React.memo(Controls);

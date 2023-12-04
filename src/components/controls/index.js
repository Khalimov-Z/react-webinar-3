import React from "react";
import './style.css';
import {getPluralForm} from '../../utils';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";


function Controls({uniqueItemsCount, totalSum, onOpenCart }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cartStatus')}>В корзине:</div>
      <div className={cn('cartContent')}>
        {uniqueItemsCount ? `${uniqueItemsCount} ${getPluralForm(uniqueItemsCount)} / ${totalSum}` : 'пусто'}
      </div>
      <button className={cn('goToButton')} onClick={onOpenCart}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  uniqueItemsCount: PropTypes.number.isRequired,
  onOpenCart: PropTypes.func.isRequired,
};

export default React.memo(Controls);

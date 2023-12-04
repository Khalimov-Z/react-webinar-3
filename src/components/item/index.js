import React from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {formatPrice} from "../../utils";

function Item(props) {
  const cn = bem('Item');
  const handleAddToCart = () => {
    props.onAddToCart(props.item.code);
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{formatPrice( props.item.price)}</div>
        <button className={cn('btn')} onClick={handleAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

Item.defaultProps = {
  item: {
    code: '',
    title: '',
    price: 0,
  },
};

export default React.memo(Item);

import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onOpenItem: (e) => {
      props.onOpen(props.item._id);
      callbacks.closeBasket();
    },
    closeBasket: () => props.onClose()
  };

  return (
    <div className={cn()}>
      <div className={cn("title")} onClick={callbacks.onOpenItem}>
        <span>{props.item.title}</span>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  onOpenItem: propTypes.func,
  closeBasket: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onOpenItem: () => {},
  closeBasket: () => {}
}

export default memo(ItemBasket);

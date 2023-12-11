import PropTypes from "prop-types";
import {numberFormat} from "../../utils";
import "./style.css";
import {memo} from "react";

const itemsTitle = {
    country: 'Страна производитель: ',
    category: 'Категория: ',
    edition: 'Год выпуска: ',
    price: 'Цена: ',
}

function ItemProvision(props) {

  const callbacks = {
    onAdd: () => props.onAdd({
      _id: props.item._id,
      price: props.item.price,
      title: props.item.title,
    })
  };

  return (
    <div className="ItemProvision">
      <p>{props.item.description}</p>
      <p>{itemsTitle.country}<strong>{props.item.madeIn.title} ({props.item.madeIn.code})</strong></p>
      <p>{itemsTitle.category}<strong>{props.item.category.title}</strong></p>
      <p>{itemsTitle.edition}<strong>{props.item.edition}</strong></p>
      <h2>{itemsTitle.price}{numberFormat(props.item.price)} ₽</h2>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>);
}

ItemProvision.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    edition: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  onAdd: PropTypes.func,
  lang: PropTypes.string,
};

ItemProvision.defaultProps = {
  onAdd: () => {
  },
};

export default memo(ItemProvision);
import React from "react";
import Item from "../item";
import './style.css';
import PropTypes from "prop-types";

function List({ list, onAddToCart }) {
  return (
    <div className='List'>
      {list.map((item) => (
        <div key={item.code} className='List-item'>
          <Item item={item} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(List);

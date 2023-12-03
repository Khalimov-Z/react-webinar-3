import React from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./components/cart-modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const [cartItems, setCartItems] = React.useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = React.useState(false);

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.code === item.code);

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.code === item.code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.code !== item.code));
  };

  const handleOpenCart = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };
  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls cartItems={cartItems} onOpenCart={handleOpenCart} />
      <List list={list} onAddToCart={handleAddToCart} />
      {isCartModalOpen && (
        <CartModal cartItems={cartItems} onCloseCart={handleCloseCart} onRemoveFromCart={handleRemoveFromCart} />
      )}
    </PageLayout>
  );
}

export default App;

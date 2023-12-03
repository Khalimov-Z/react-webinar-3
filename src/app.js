import React, {useCallback} from 'react';
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
  const cart = store.getState().cart;
  const isCartModalOpen = store.getState().isCartModalOpen;
  const cartCount = store.getCartCount()

  const callbacks = {
    handleAddToCart: useCallback((item) => {
      store.addToCart(item)
    }, [store]),

    handleRemoveFromCart: useCallback((item) => {
      store.removeFromCart(item)
    },[store]),

    handleOpenCart: useCallback(() => {
      store.openCartModal();
    },[store]),

    handleCloseCart: useCallback(() => {
      store.closeCartModal()
    },[store])

  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls cartCount={cartCount} cart={cart} onOpenCart={callbacks.handleOpenCart} />
      <List list={list} onAddToCart={callbacks.handleAddToCart} />
      {isCartModalOpen && (
        <CartModal
          cart={cart}
          onCloseCart={callbacks.handleCloseCart}
          onRemoveFromCart={callbacks.handleRemoveFromCart}
        />
      )}
    </PageLayout>
  );
}

export default App;


/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }


  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item
   */
  addToCart(item) {
    const existingItem = this.state.cart.find((cartItem) => cartItem.code === item.code);

    if (existingItem) {
      const updatedCart = this.state.cart.map((cartItem) =>
        cartItem.code === item.code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );

      this.setState({ ...this.state, cart: updatedCart });
    } else {
      const updatedCart = [...this.state.cart, { ...item, quantity: 1 }];
      this.setState({ ...this.state, cart: updatedCart });
    }
  }

  /**
   * Удаление товара из корзины
   * @param item {Object} - Удаляемый товар
   */
  removeFromCart(item) {
    const updatedCart = this.state.cart.filter(cartItem => cartItem.code !== item.code);
    this.setState({ ...this.state, cart: updatedCart });
  }

  /**
   * Открытие модального окна корзины
   */
  openCartModal() {
    this.setState({ ...this.state, isCartModalOpen: true });
  }

  /**
   * Закрытие модального окна корзины
   */
  closeCartModal() {
    this.setState({ ...this.state, isCartModalOpen: false });
  }

  /**
   * Получение общего количества товаров в корзине
   * @returns {Object} - Общее количество товаров в корзине
   */
  getCartCount() {
    const cart = this.state.cart || [];
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

}




export default Store;

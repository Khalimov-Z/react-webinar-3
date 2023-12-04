import {calculateTotalSum} from './utils.js'

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const { list = [], cart = [] } = initState;

    this.state = Object.assign({}, initState, {
      list,
      cart,
      headerInfo: {
        uniqueItemsCount: 0,
        totalSum: 0,
      },
      isCartModalOpen: false,
    });
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


  updateHeaderInfo() {
    const uniqueItemsCount = this.state.cart.reduce((count, item) => count + 1, 0);
    const totalSum = calculateTotalSum(this.state.cart);

    this.setState({
      ...this.state,
      headerInfo: {
        uniqueItemsCount,
        totalSum,
      },
    });
  }


  /**
   * Добавление товара в корзину
   *
   */
  addToCart(itemId) {
    const { cart } = this.state;
    const itemIndex = cart.findIndex((cartItem) => cartItem.code === itemId);

    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex] = { ...cart[itemIndex], quantity: cart[itemIndex].quantity + 1 };

      this.setState({ ...this.state, cart: updatedCart });
    } else {
      const item = this.findItemById(itemId);
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      this.setState({ ...this.state, cart: updatedCart });
    }
    this.updateHeaderInfo();
  }

  findItemById(itemId) {
    const { list } = this.state;
    return list.find((item) => item.code === itemId);
  }

  /**
   * Удаление товара из корзины
   *
   */
  removeFromCart(itemId) {
    const { cart } = this.state;
    const updatedCart = cart.filter(cartItem => cartItem.code !== itemId);

    this.setState({ ...this.state, cart: updatedCart });
    this.updateHeaderInfo();
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

}




export default Store;

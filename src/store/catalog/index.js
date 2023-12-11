import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],            // Список товаров
      perPage: 10,         // Лимит товаров на странице
      currentPage: 0,      // Количество товаров, которые нужно пропустить при загрузке
      count: 0,            // Общее количество товаров
    };
  }

  // Установка значения для пропуска товаров при загрузке
  updateSkip(currentPage) {
    this.setState({ ...this.getState(), currentPage });
  }

  // Асинхронная загрузка данных
  async load() {
    try {
      const { perPage, currentPage } = this.getState();
      const queryParams = `limit=${perPage}&skip=${currentPage}&fields=items(_id, title, price), count`;
      const response = await fetch(`/api/v1/articles?${queryParams}`);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      }, 'Загружены товары из API');
    } catch (error) {
      console.error(`Ошибка при загрузке данных: ${error.message}`);
    }
  }
}
export default Catalog;



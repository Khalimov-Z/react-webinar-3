import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import {useNavigate} from "react-router-dom";

function Main() {

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    perPage: state.catalog.perPage,
    count: state.catalog.count
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.currentPage]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    changePage: useCallback((page) => {
      store.actions.catalog.updateSkip((page - 1) * select.perPage);
    }, [store]),

    onOpenItemPage: useCallback((_id) => navigate(`/provision/${_id}`),
      [store]
    ),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}
        onOpen={callbacks.onOpenItemPage}
      />
    }, [callbacks.addToBasket, callbacks.onOpenItemPage]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        current={select.currentPage / select.perPage + 1}
        total={Math.ceil(+select.count / select.perPage)}
        changePage={callbacks.changePage}
      />
    </PageLayout>

  );
}

export default memo(Main);

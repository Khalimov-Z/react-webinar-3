import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import {useCallback, useEffect, useState} from "react";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import ItemProvision from "../../components/item-provision";
import Positioner from "../../components/positioner";
import MainMenu from "../../components/main-menu";


function Provision() {
  const store = useStore();
  const [loading, setLoading] = useState(false);

  const {id} = useParams();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    provision: state.provision,
  }));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await store.actions.provision.load(id)
      setLoading(false);
    }
    fetchData();
    return () => {
      store.actions.provision.initState();
    }
  }, [id])

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addItemToBasket(item), [store]),

  }
  return (
    <PageLayout>
      <Head title={select.provision.title} />
      <Positioner
        left={<MainMenu />}
        right={
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum} />}
      />
      {!loading && <ItemProvision item={select.provision}
                               onAdd={callbacks.addToBasket} />}
    </PageLayout>
  )
}

export default Provision;
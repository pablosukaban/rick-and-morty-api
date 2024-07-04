import { observer } from 'mobx-react-lite';
import { useInstance } from 'react-ioc';
import { CharsItemStore } from './store';
import { useEffect } from 'react';

const CharsItem = observer(() => {
  const store = useInstance(CharsItemStore);

  useEffect(() => {
    store.init();
  }, []);

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.fetchData) {
    return <div>No data</div>;
  }

  return <div>{store.fetchData.name}</div>;
});

export default CharsItem;

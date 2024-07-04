import { observer } from 'mobx-react-lite';
import { useInstance } from 'react-ioc';
import { CharsListStore } from './store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CharsList = observer(() => {
  const store = useInstance(CharsListStore);

  const navigate = useNavigate();

  useEffect(() => {
    store.init();
  }, []);

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.fetchData.length) {
    return <div>No data</div>;
  }

  return (
    <div>
      {store.fetchData.map((character) => (
        <div
          key={character.id}
          onClick={() => navigate(`/character/${character.id}`)}
        >
          {character.name}
        </div>
      ))}
    </div>
  );
});

export default CharsList;

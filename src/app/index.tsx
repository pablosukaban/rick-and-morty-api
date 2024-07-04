import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import Routing from '../pages';
import { Provider } from 'react-ioc';
import { CharsListStore } from '../pages/chars-list/store';
import { CharsItemStore } from '../pages/chars-item/store';

const App = Provider(
  CharsListStore,
  CharsItemStore
)(() => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routing />
    </Suspense>
  );
});

export default App;

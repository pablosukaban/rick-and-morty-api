import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import Routing from '../pages';

const App = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routing />
    </Suspense>
  );
};

export default App;

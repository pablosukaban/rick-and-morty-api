import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';

function App() {
  return <Suspense fallback={<CircularProgress />}></Suspense>;
}

export default App;

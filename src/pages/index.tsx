import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const CharactersList = lazy(() => import('./chars-list/'));
const CharactersItem = lazy(() => import('./chars-item/'));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<CharactersList />} />
      <Route path="/character/:id" element={<CharactersItem />} />
    </Routes>
  );
};

export default Routing;

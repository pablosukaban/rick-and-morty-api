import { Box, Grid, Pagination, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useInstance } from 'react-ioc';
import CharacterCard from '../../entity/ui/CharacterCard';
import { SearchFilter } from '../../features/SearchFilter';
import Layout from '../../shared/ui/Layout';
import NetworkWrapper from '../../shared/ui/NetworkWrapper';
import { CharsListStore } from './store';

const CharsList = observer(() => {
  const store = useInstance(CharsListStore);

  useEffect(() => {
    store.init();
  }, [store]);

  return (
    <Layout>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h2">Персонажи</Typography>
        <Pagination count={store.pagination?.pages} onChange={store.getCharactersByPage} />
      </Box>
      <SearchFilter
        value={store.searchValue}
        onChange={store.setSearchValue}
        onClick={store.getCharacters}
      />
      <NetworkWrapper
        isLoading={store.isLoading}
        isEmpty={!store.charactersList || !store.charactersList.length}
        variant="multiple">
        <Grid container spacing={2}>
          {(store.charactersList || []).map((character) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <CharacterCard character={character} />{' '}
            </Grid>
          ))}
        </Grid>
      </NetworkWrapper>
    </Layout>
  );
});

export default CharsList;

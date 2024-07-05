import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useInstance } from 'react-ioc';
import { CharsListStore } from './store';
import NetworkWrapper from '../../shared/components/NetworkWrapper';
import Layout from '../../shared/components/Layout';
import { useNavigate } from 'react-router-dom';
import { SearchFilter } from '../../features/SearchFilter';

const CharsList = observer(() => {
  const store = useInstance(CharsListStore);
  const navigate = useNavigate();

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
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={character.image}
                  alt={character.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {character.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {character.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => navigate(`/character/${character.id}`)}>
                    Перейти
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </NetworkWrapper>
    </Layout>
  );
});

export default CharsList;

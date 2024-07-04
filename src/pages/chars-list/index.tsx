import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useInstance } from 'react-ioc';
import { CharsListStore } from './store';
import NetworkWrapper from '../../shared/components/NetworkWrapper';
import Layout from '../../shared/components/Layout';
import { useNavigate } from 'react-router-dom';
import { SearchFilter } from '../../shared/features/SearchFilter';

const CharsList = observer(() => {
  const store = useInstance(CharsListStore);
  const navigate = useNavigate();

  useEffect(() => {
    store.init();
  }, []);

  return (
    <Layout>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant='h2'>Персонажи</Typography>
        <Box display={'flex'} gap={1}>
          <Button
            size='small'
            color='primary'
            variant='outlined'
            onClick={() => store.getCharactersByPage('prev')}
            disabled={!store.prevPage}
          >
            Предыдущая страница
          </Button>
          <Button
            size='small'
            color='primary'
            variant='outlined'
            onClick={() => store.getCharactersByPage('next')}
            disabled={!store.nextPage}
          >
            Следующая страница
          </Button>
        </Box>
      </Box>
      <SearchFilter
        value={store.searchValue}
        onChange={store.setSearchValue}
        onClick={store.getCharacters}
      />
      <NetworkWrapper
        isLoading={store.isLoading}
        isEmpty={!store.fetchData.length}
        variant='multiple'
      >
        <Grid container spacing={2}>
          {store.fetchData.map((character) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component='img'
                  height='140'
                  image={character.image}
                  alt={character.name}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {character.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Status: {character.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size='small'
                    color='primary'
                    variant='outlined'
                    onClick={() => navigate(`/character/${character.id}`)}
                  >
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

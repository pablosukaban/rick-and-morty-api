import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useInstance } from 'react-ioc';
import { CharsListStore } from './store';
import NetworkWrapper from '../../shared/components/NetworkWrapper';

const CharsList = observer(() => {
  const store = useInstance(CharsListStore);

  useEffect(() => {
    store.init();
  }, []);

  return (
    <Container maxWidth='md'>
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
            onClick={store.getPrevPage}
            disabled={!store.prevPage}
          >
            Предыдущая страница
          </Button>
          <Button
            size='small'
            color='primary'
            variant='outlined'
            onClick={store.getNextPage}
            disabled={!store.nextPage}
          >
            Следующая страница
          </Button>
        </Box>
      </Box>

      <NetworkWrapper
        isLoading={store.isLoading}
        isEmpty={!store.fetchData.length}
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
                    href={`/character/${character.id}`}
                  >
                    Перейти
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </NetworkWrapper>
    </Container>
  );
});

export default CharsList;

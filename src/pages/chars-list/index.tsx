import { observer } from 'mobx-react-lite';
import { useInstance } from 'react-ioc';
import { CharsListStore } from './store';
import { useEffect } from 'react';
import {
  Card,
  Container,
  Grid,
  Typography,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';

const CharsList = observer(() => {
  const store = useInstance(CharsListStore);

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
    <Container maxWidth='md'>
      <Typography variant='h2'>Персонажи</Typography>
      
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
    </Container>
  );
});

export default CharsList;

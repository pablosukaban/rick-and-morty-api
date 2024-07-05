import { observer } from 'mobx-react-lite';
import { Provider, useInstance } from 'react-ioc';
import { CharsItemStore } from './store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../shared/ui/Layout';
import { Box, Button, Typography } from '@mui/material';
import NetworkWrapper from '../../shared/ui/NetworkWrapper';

const CharsItem = Provider(CharsItemStore)(
  observer(() => {
    const store = useInstance(CharsItemStore);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      if (id) store.init(id);
    }, [store, id]);

    return (
      <Layout>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h2">{store.fetchData?.name}</Typography>
          <Button size="small" color="primary" variant="outlined" onClick={() => navigate('/')}>
            Назад
          </Button>
        </Box>
        <NetworkWrapper isLoading={store.isLoading} isEmpty={!store.fetchData} variant="single">
          <Box display={'flex'} gap={1}>
            <img src={store.fetchData?.image} alt={store.fetchData?.name} />
            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} gap={1}>
              <Typography variant="h6">Gender: {store.fetchData?.gender}</Typography>
              <Typography variant="h6">Species: {store.fetchData?.species}</Typography>
              <Typography variant="h6">Status: {store.fetchData?.status}</Typography>
              {store.fetchData?.type && (
                <Typography variant="h6">Type: {store.fetchData?.type}</Typography>
              )}
              <Typography variant="h6">
                Episodes count: {store.fetchData?.episode.length}
              </Typography>
              <Typography variant="h6">Origin: {store.fetchData?.origin.name}</Typography>
              <Typography variant="h6">Location: {store.fetchData?.location.name}</Typography>
            </Box>
          </Box>
        </NetworkWrapper>
      </Layout>
    );
  })
);

export default CharsItem;

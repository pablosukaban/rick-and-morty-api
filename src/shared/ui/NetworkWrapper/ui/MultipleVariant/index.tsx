import { Grid, Skeleton } from '@mui/material';

const MultipleVariant = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Skeleton variant="rectangular" height={140} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MultipleVariant;

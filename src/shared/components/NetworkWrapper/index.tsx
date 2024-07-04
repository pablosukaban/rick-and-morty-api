import { Grid, Skeleton, Typography } from '@mui/material';
import { ReactNode } from 'react';

const SingleVariant = () => {
  return <Skeleton variant='rectangular' height={320} />;
};

const MultipleVariant = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
          <Skeleton variant='rectangular' height={140} />
        </Grid>
      ))}
    </Grid>
  );
};

const NetworkWrapper = ({
  children,
  isLoading,
  isEmpty,
  variant,
}: {
  isLoading: boolean;
  children: ReactNode;
  isEmpty: boolean;
  variant?: 'single' | 'multiple';
}) => {
  const SkeletonComponent =
    variant === 'single' ? SingleVariant : MultipleVariant;

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (!isLoading && isEmpty) {
    return <Typography variant='h4'>Список пуст</Typography>;
  }

  return <>{children}</>;
};

export default NetworkWrapper;

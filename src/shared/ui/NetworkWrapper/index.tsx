import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import SingleVariant from './ui/SingleVariant';
import MultipleVariant from './ui/MultipleVariant';

const NetworkWrapper = ({
  children,
  isLoading,
  isEmpty,
  variant
}: {
  isLoading: boolean;
  children: ReactNode;
  isEmpty: boolean;
  variant?: 'single' | 'multiple';
}) => {
  const SkeletonComponent = variant === 'single' ? SingleVariant : MultipleVariant;

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (!isLoading && isEmpty) {
    return <Typography variant="h4">Список пуст</Typography>;
  }

  return <>{children}</>;
};

export default NetworkWrapper;

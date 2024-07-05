import { Box, Button, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ChangeEventHandler, FC, MouseEventHandler } from 'react';

type SearchFilterProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const SearchFilter: FC<SearchFilterProps> = observer(({ onChange, value, onClick }) => {
  return (
    <Box display={'flex'} gap={1} mt={2} mb={2}>
      <TextField
        id="outlined-basic"
        label="Имя персонажа"
        variant="outlined"
        value={value}
        onChange={onChange}
        fullWidth
      />
      <Button size="small" color="primary" variant="outlined" onClick={onClick}>
        Поиск
      </Button>
    </Box>
  );
});

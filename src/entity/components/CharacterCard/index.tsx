import { useNavigate } from 'react-router-dom';
import { Character } from '../../../shared/api/models';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';

type CharacterCardProps = {
  character: Character;
};

const CharacterCard = observer(({ character }: CharacterCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia component="img" height="140" image={character.image} alt={character.name} />
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
  );
});

export default CharacterCard;

import { Card, CardActionArea, CardContent, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { CharacterListItemProps } from './CharacterListItem.types';
import './CharacterListItem.styled.css';

export function CharacterListItem({ person }: CharacterListItemProps) {
  return (
    <Card variant="outlined" className="character-card">
      <CardActionArea
        component={RouterLink}
        to={`/character/${person.id}`}
        className="character-card__content-wrapper"
      >
        <CardContent className="character-card__content">
          <Stack spacing={0.75} flexGrow={1}>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {person.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Пол: {person.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Рост: {person.height}
            </Typography>
            <Typography variant="caption" color="text.disabled" className="character-card__id">
              #{person.id}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

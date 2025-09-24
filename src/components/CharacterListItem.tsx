import { Card, CardActionArea, CardContent, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { CharacterListItemProps } from './CharacterListItem.types';
import './CharacterListItem.styled.css';
import { mergePersonWithEdits } from '../utils/personEdits';

export function CharacterListItem({ person }: CharacterListItemProps) {
  const merged = mergePersonWithEdits(person);
  return (
    <Card variant="outlined" className="character-card">
      <CardActionArea
        component={RouterLink}
        to={`/character/${merged.id}`}
        className="character-card__content-wrapper"
      >
        <CardContent className="character-card__content">
          <Stack spacing={0.75} flexGrow={1}>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {merged.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Пол: {merged.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Рост: {merged.height}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Вес: {merged.mass}
            </Typography>
            <Typography variant="caption" color="text.disabled" className="character-card__id">
              id: {merged.id}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

import { Card, CardActionArea, CardContent, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Person } from '../store/types';

interface CharacterListItemProps {
  person: Person;
}

export function CharacterListItem({ person }: CharacterListItemProps) {
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', width: 260, minHeight: 140 }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/character/${person.id}`}
        sx={{ flexGrow: 1, alignItems: 'stretch' }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
            <Typography variant="caption" color="text.disabled" sx={{ mt: 'auto' }}>
              #{person.id}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

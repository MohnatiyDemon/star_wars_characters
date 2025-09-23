import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { buildStarLayer } from '../utils/starfield';

const drift = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(1000px); }
`;

const layer1 = buildStarLayer(180, 1800);
const layer2 = buildStarLayer(120, 1600);
const layer3 = buildStarLayer(80, 1400);

export function Starfield() {
  return (
    <Box aria-hidden="true" sx={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      {[layer1, layer2, layer3].map((layer, idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1px',
            height: '1px',
            boxShadow: layer,
            animation: `${drift} ${40 + idx * 20}s linear infinite`,
            opacity: 0.4 + idx * 0.2,
            willChange: 'transform',
          }}
        />
      ))}
    </Box>
  );
}

export default Starfield;

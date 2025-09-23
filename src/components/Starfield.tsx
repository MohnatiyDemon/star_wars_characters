import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const drift = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(1000px); }
`;

function buildLayer(count: number, spread: number) {
  const arr: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * spread;
    const y = Math.random() * spread;
    arr.push(`${x}px ${y}px #fff`);
  }
  return arr.join(',');
}

const layer1 = buildLayer(180, 1800);
const layer2 = buildLayer(120, 1600);
const layer3 = buildLayer(80, 1400);

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

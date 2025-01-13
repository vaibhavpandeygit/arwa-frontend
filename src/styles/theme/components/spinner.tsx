import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export default function Spinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress
        sx={{
          color: 'primary.main',
          marginBottom: 2,
        }}
        size={60}
        thickness={4}
      />
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
}

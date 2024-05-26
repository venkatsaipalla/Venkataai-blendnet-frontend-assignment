import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <CircularProgress />
      <Typography variant="h6" mt={2}>Loading...</Typography>
    </Box>
  );
};

export default LoadingScreen;

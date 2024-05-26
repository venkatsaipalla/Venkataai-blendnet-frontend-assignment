import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Box } from '@mui/material';

const TimesUp: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Time's Up!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Oops! Looks like you ran out of time.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" component={Link} to="/quiz">
            Retry Quiz
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TimesUp;

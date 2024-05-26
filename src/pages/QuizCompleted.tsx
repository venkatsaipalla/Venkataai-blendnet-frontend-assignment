import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, Button, Container, Box } from "@mui/material";
import { RootState } from "../store/store";

const QuizCompleted: React.FC = () => {
  const score = useSelector((state: RootState) => state.score.value);
  const questions = useSelector((state: RootState) => state.questions.list);

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Quiz Completed
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Your Score: {score}/{questions.length}
        </Typography>
        <Box mt={3} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/quiz"
          >
            Retry Quiz
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default QuizCompleted;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateQuestion } from "../reducers/questionsSlice";
import QuestionInterface from "../Components/QuestionInterface";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Question } from "../types/questions";
import { incrementScore, resetScore } from "../reducers/scoreSlice";

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector((state: RootState) => state.questions.list);
  const score = useSelector((state: RootState) => state.score.value);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    dispatch(resetScore());
  }, [dispatch]);

  const handleAnswerSubmit = (selectedOption: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctOption) {
      dispatch(incrementScore());
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/quiz-completed");
    }
  };

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/times-up");
    }
  };

  const handleQuestionUpdate = (updatedQuestion: Question) => {
    dispatch(updateQuestion(updatedQuestion));
  };

  return (
    <Container>
      {questions.length > 0 ? (
        <Box mt={4}>
          <Typography variant="h6">Score: {score}</Typography>
          <QuestionInterface
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            onSubmit={handleAnswerSubmit}
            onTimeUp={handleTimeUp}
            onUpdate={handleQuestionUpdate}
          />
        </Box>
      ) : (
        <Typography variant="h6">No questions available.</Typography>
      )}
    </Container>
  );
};

export default Quiz;

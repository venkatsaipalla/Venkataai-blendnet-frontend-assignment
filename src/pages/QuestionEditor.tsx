import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Button, Container, Typography } from "@mui/material";
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "../reducers/questionsSlice";
import EditQuestionDialog from "../Components/EditQuestionDialog";
import { Question } from "../types/questions";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const QuestionEditor: React.FC = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions.list);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleAddClick = () => {
    const newQuestion: Question = {
      id: uuidv4(),
      text: "",
      audioUrl: "",
      options: ["", "", "", ""],
      correctOption: "",
    };
    setSelectedQuestion(newQuestion);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    dispatch(deleteQuestion(id));
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedQuestion(null);
  };

  const handleSave = (question: Question) => {
    if (isEditing) {
      dispatch(updateQuestion(question));
    } else {
      dispatch(addQuestion(question));
    }
    handleCloseDialog();
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Question Editor
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          style={{ marginRight: "8px" }}
        >
          Add Question
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/quiz">
          Quiz
        </Button>
        {questions.map((question) => (
          <Box key={question.id} mb={2}>
            <Typography variant="h6">{question.text}</Typography>
            <Button
              variant="outlined"
              onClick={() => handleEditClick(question)}
              style={{ marginRight: "8px" }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteClick(question.id)}
            >
              Delete
            </Button>
          </Box>
        ))}
        {selectedQuestion && (
          <EditQuestionDialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            question={selectedQuestion}
            onSave={handleSave}
          />
        )}
      </Box>
    </Container>
  );
};

export default QuestionEditor;

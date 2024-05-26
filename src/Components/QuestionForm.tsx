import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { Question } from "../types/questions";

interface Props {
  onAddQuestion: (question: Question) => void;
}

const QuestionForm: React.FC<Props> = ({ onAddQuestion }) => {
  const [questionNumber, setQuestionNumber] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    onAddQuestion({
      id: questionNumber,
      text: questionText,
      audioUrl,
      options,
      correctOption,
    });
    setQuestionText("");
    setAudioUrl("");
    setOptions(["", "", "", ""]);
    setCorrectOption("");
  };

  return (
    <Box>
      <TextField
        label="Question No"
        value={questionNumber}
        onChange={(e) => setQuestionNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Audio URL"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        fullWidth
        margin="normal"
        placeholder="Audio URL (optional)"
      />
      {options.map((option, index) => (
        <TextField
          key={index}
          label={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          fullWidth
          margin="normal"
        />
      ))}
      <TextField
        label="Correct Option"
        value={correctOption}
        onChange={(e) => setCorrectOption(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddQuestion}
        sx={{ mt: 2 }}
      >
        Add Question
      </Button>
    </Box>
  );
};

export default QuestionForm;

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Question } from "../types/questions";

interface Props {
  open: boolean;
  onClose: () => void;
  question: Question;
  onSave: (updatedQuestion: Question) => void;
}

const EditQuestionDialog: React.FC<Props> = ({
  open,
  onClose,
  question,
  onSave,
}) => {
  const [updatedQuestion, setUpdatedQuestion] = useState<Question>({
    ...question,
  });
  const [correctOptionError, setCorrectOptionError] = useState<string>("");

  useEffect(() => {
    setUpdatedQuestion({ ...question });
  }, [question]);

  const handleChange = (field: keyof Question, value: string) => {
    setUpdatedQuestion((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...updatedQuestion.options];
    newOptions[index] = value;
    setUpdatedQuestion((prevState) => ({
      ...prevState,
      options: newOptions,
    }));

    if (!newOptions.includes(updatedQuestion.correctOption)) {
      setCorrectOptionError(
        "Correct option must be one of the options provided."
      );
    } else {
      setCorrectOptionError("");
    }
  };

  const handleCorrectOptionChange = (value: string) => {
    if (!updatedQuestion.options.includes(value)) {
      setCorrectOptionError(
        "Correct option must be one of the options provided."
      );
    } else {
      setCorrectOptionError("");
    }
    setUpdatedQuestion((prevState) => ({ ...prevState, correctOption: value }));
  };

  const handleSave = () => {
    if (!updatedQuestion.options.includes(updatedQuestion.correctOption)) {
      setCorrectOptionError(
        "Correct option must be one of the options provided."
      );
      return;
    }
    onSave(updatedQuestion);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent>
        <TextField
          label="Question"
          value={updatedQuestion.text}
          onChange={(e) => handleChange("text", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Audio URL"
          value={updatedQuestion.audioUrl || ""}
          onChange={(e) => handleChange("audioUrl", e.target.value)}
          fullWidth
          margin="normal"
        />
        {updatedQuestion.options.map((option, index) => (
          <TextField
            key={index}
            label={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            fullWidth
            margin="normal"
          />
        ))}
        <FormControl fullWidth margin="normal">
          <InputLabel id="correct-option-label">Correct Option</InputLabel>
          <Select
            labelId="correct-option-label"
            value={updatedQuestion.correctOption}
            onChange={(e) =>
              handleCorrectOptionChange(e.target.value as string)
            }
            error={!!correctOptionError}
          >
            {updatedQuestion.options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {correctOptionError && (
          <Typography color="error">{correctOptionError}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={!!correctOptionError}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionDialog;

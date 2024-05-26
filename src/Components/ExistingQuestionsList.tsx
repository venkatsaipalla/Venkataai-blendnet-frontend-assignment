import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Question } from "../types/questions";

interface Props {
  questions: Question[];
  onEditClick: (index: number) => void;
  onRemoveQuestion: (index: number) => void;
}

const ExistingQuestionsList: React.FC<Props> = ({
  questions,
  onEditClick,
  onRemoveQuestion,
}) => {
  return (
    <List>
      {questions.map((question, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText primary={`Question ${index + 1}`} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEditClick(index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onRemoveQuestion(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index !== questions.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default ExistingQuestionsList;

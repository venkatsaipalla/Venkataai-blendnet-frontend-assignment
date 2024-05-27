import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { Question } from "../types/questions";
  
interface QuestionInterfaceProps {
  question: Question;
  questionNumber: number;
  onSubmit: (selectedOption: string) => void;
  onTimeUp: () => void;
  onUpdate: (updatedQuestion: Question) => void;
}

const VoiceRssApiKey = "1040bf4a1a0f41bb8c7ca5d885b3529b";
const questionTimeLimit = 15; // Time limit for answering each question in seconds

const QuestionInterface: React.FC<QuestionInterfaceProps> = ({
  question,
  questionNumber,
  onSubmit,
  onTimeUp,
  onUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questionTimeLimit);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | undefined>(
    question.audioUrl
  );
  const navigate = useNavigate();

  useEffect(() => {
    setTimeLeft(questionTimeLimit); // Reset timer when question changes
    setAudioUrl(undefined); // Reset audio URL when question changes
  }, [question]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp(); // Redirect to times-up page if time runs out
    }
  }, [timeLeft, onTimeUp]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    onSubmit(selectedOption);
    setSelectedOption("");
  };

  const playAudio = async () => {
    if (!audioUrl) {
      try {
        setLoading(true); // Show loader
        const response = await fetch(
          `https://api.voicerss.org/?key=${VoiceRssApiKey}&hl=en-us&src=${encodeURIComponent(
            question.text
          )}`
        );
        const blob = await response.blob();
        const newAudioUrl = URL.createObjectURL(blob);
        setAudioUrl(newAudioUrl);
      } catch (error) {
        console.error("Error fetching audio:", error);
      } finally {
        setLoading(false); // Hide loader
      }
    }
  };

  const handleManageQuestionsClick = () => {
    navigate("/questions");
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "3rem", maxWidth: "600px", margin: "20px auto" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ padding: "1rem" }}
      >
        <Typography variant="h6" gutterBottom>
          Question {questionNumber}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleManageQuestionsClick}
        >
          Manage Questions
        </Button>
      </Box>
      <Typography variant="h5" gutterBottom>
        {question.text}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={playAudio}
            disabled={loading}
            style={{ height: "56px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Play Question"}
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="body2">Time Left: {timeLeft} seconds</Typography>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Grid container spacing={2}>
          {question.options.map((option, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                variant={selectedOption === option ? "contained" : "outlined"}
                fullWidth
                onClick={() => handleOptionClick(option)}
                style={{
                  height: "56px",
                  color: selectedOption === option ? "primary" : "default",
                }}
              >
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Submit
        </Button>
      </Box>
      {audioUrl && (
        <AudioPlayer
          src={audioUrl}
          autoPlay={false}
          onPlay={() => console.log("Audio playback started")}
          onError={(error) => console.error("Error playing audio:", error)}
        />
      )}
    </Paper>
  );
};

export default QuestionInterface;

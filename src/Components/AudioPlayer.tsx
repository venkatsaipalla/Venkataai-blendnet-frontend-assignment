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

interface Question {
  text: string;
  audioUrl?: string;
  options: string[];
  correctOption: string;
}

interface QuestionInterfaceProps {
  question: Question;
  questionNumber: number;
  onSubmit: (selectedOption: string) => void;
  onTimeUp: () => void;
}

const VoiceRssApiKey = "1040bf4a1a0f41bb8c7ca5d885b3529b";
const questionTimeLimit = 15; // Time limit for answering each question in seconds

const QuestionInterface: React.FC<QuestionInterfaceProps> = ({
  question,
  questionNumber,
  onSubmit,
  onTimeUp,
}) => {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questionTimeLimit);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | undefined>(
    question.audioUrl
  );

  useEffect(() => {
    const fetchAudio = async () => {
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

    fetchAudio();
  }, [audioUrl, question.text]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    onSubmit(selectedOption);
    setSelectedOption("");
  };

  const playAudio = () => {
    if (audioUrl) {
      // Play audio
      console.log("Audio playback started");
    } else {
      console.error("Audio URL not available");
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Question {questionNumber}
      </Typography>
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
                  color: `{${selectedOption} === ${option} ? "primary" : "default"}`,
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

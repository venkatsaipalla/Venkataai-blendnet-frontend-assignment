interface Question {
  id: string;
  text: string;
  audioUrl?: string;
  options: string[];
  correctOption: string;
}

export const questions: Question[] = [
  {
    id: "1",
    text: "What is the capital of France?",
    // audioUrl: "https://example.com/audio1.mp3",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctOption: "Option 1",
  },
  {
    id: "2",
    text: "What is the largest planet in our solar system?",
    // audioUrl: 'https://example.com/audio/largest-planet.mp3',
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    correctOption: "Jupiter",
  },
  // Add more questions as needed
];
export const addQuestion = (question: Question) => {
  questions.push(question);
};

export const removeQuestion = (index: number) => {
  questions.splice(index, 1);
};

export const getQuestions = () => {
  return questions;
};

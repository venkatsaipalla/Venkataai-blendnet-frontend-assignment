# MCQ Quiz Application
# Live URL : https://venkataai-blendnet-frontend-assignment.vercel.app/quiz

## Overview
The MCQ Quiz Application is a React-based web application that allows users to take multiple-choice quizzes. It features an interactive user interface for answering questions, a timer for each question, score tracking, and the ability to edit questions. The application uses Redux for state management and Material-UI for styling.

## Features
- Multiple-choice question interface
- Timer for each question
- Score tracking
- Ability to manage (add, edit, delete) questions
- Audio playback for questions with audio URLs(Optional)
- Integrated API for converting Question Text to audio
- Navigation to different states of the quiz (e.g., times up, quiz completed)

## Technologies Used
- React
- Redux Toolkit
- TypeScript
- Material-UI
- React Router
- UUID for unique ID generation

## Project Structure
```plaintext
src/
├── Components/
│   ├── EditQuestionDialog.tsx
│   ├── LoadingScreen.tsx
│   └── QuestionInterface.tsx
├── pages/
│   ├── Quiz.tsx
│   ├── TimesUp.tsx
│   ├── QuizCompleted.tsx
│   └── QuestionEditor.tsx
├── reducers/
│   ├── questionsSlice.ts
│   └── scoreSlice.ts
├── store/
│   └── store.ts
├── styles/
│   └── theme.ts
├── types/
│   └── questions.ts
├── App.tsx
├── index.tsx
└── api/
    └── questions.ts

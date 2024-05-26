import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { Provider } from 'react-redux';
import LoadingScreen from './Components/LoadingScreen';
import Quiz from './pages/Quiz';
import TimesUp from './pages/TimesUp';
import QuizCompleted from './pages/QuizCompleted';
import QuestionEditor from './pages/QuestionEditor';
import theme from './styles/theme';
import store from './store/store';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Router>
            <Routes>
              <Route path="/" element={<Quiz />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/times-up" element={<TimesUp />} />
              <Route path="/quiz-completed" element={<QuizCompleted />} />
              <Route path="/questions" element={<QuestionEditor />} />
            </Routes>
          </Router>
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

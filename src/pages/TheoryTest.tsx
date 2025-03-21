import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What does a red traffic light indicate?",
    options: ["Stop completely", "Slow down", "Proceed with caution", "Speed up"],
    correctAnswer: 0,
    explanation: "A red traffic light always means to stop completely behind the stop line."
  },
  {
    id: 2,
    question: "What is the speed limit in a residential area unless otherwise specified?",
    options: ["20 km/h", "40 km/h", "50 km/h", "60 km/h"],
    correctAnswer: 1,
    explanation: "The default speed limit in residential areas is 40 km/h unless otherwise posted."
  },
  {
    id: 3,
    question: "When should you use hazard lights?",
    options: [
      "When parking illegally",
      "When your vehicle becomes a temporary hazard",
      "When driving in rain",
      "When overtaking"
    ],
    correctAnswer: 1,
    explanation: "Hazard lights should be used when your vehicle becomes a temporary hazard to warn other drivers."
  },
  // Add more questions as needed
];

const TheoryTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      submitTest();
    }
  }, [timeLeft]);

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitTest = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === mockQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / mockQuestions.length) * 100;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    const score = calculateScore();
    const passed = score >= 80;

    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Test Results
            </Typography>
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Typography variant="h2" color={passed ? 'success.main' : 'error.main'}>
                {score.toFixed(1)}%
              </Typography>
              <Typography variant="h5" color={passed ? 'success.main' : 'error.main'}>
                {passed ? 'Passed!' : 'Failed'}
              </Typography>
            </Box>
            <Alert severity={passed ? 'success' : 'error'}>
              {passed
                ? 'Congratulations! You have passed the theory test.'
                : 'Unfortunately, you did not pass. Please review and try again.'}
            </Alert>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
              {!passed && (
                <Button
                  variant="outlined"
                  onClick={() => window.location.reload()}
                >
                  Retake Test
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Theory Test</Typography>
          <Typography variant="h6" color="error">
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={(currentQuestion + 1) / mockQuestions.length * 100}
          sx={{ mb: 3 }}
        />

        <Typography variant="body1" gutterBottom>
          Question {currentQuestion + 1} of {mockQuestions.length}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          {mockQuestions[currentQuestion].question}
        </Typography>

        <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
          <RadioGroup
            value={answers[currentQuestion] ?? -1}
            onChange={(e) => handleAnswer(Number(e.target.value))}
          >
            {mockQuestions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
                sx={{ mb: 1 }}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowExplanation(true)}
          >
            Show Hint
          </Button>
          {currentQuestion === mockQuestions.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={submitTest}
              disabled={answers.length !== mockQuestions.length}
            >
              Submit Test
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === undefined}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>

      <Dialog
        open={showExplanation}
        onClose={() => setShowExplanation(false)}
      >
        <DialogTitle>Explanation</DialogTitle>
        <DialogContent>
          <Typography>
            {mockQuestions[currentQuestion].explanation}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExplanation(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TheoryTest; 
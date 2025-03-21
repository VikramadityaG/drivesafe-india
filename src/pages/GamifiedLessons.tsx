import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrafficIcon from '@mui/icons-material/Traffic';
import WarningIcon from '@mui/icons-material/Warning';
import { toast } from 'react-toastify';

interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  duration: string;
  progress: number;
  isLocked: boolean;
  completed: boolean;
  icon: 'traffic' | 'car' | 'warning';
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Basic Traffic Signs',
    description: 'Learn the fundamental traffic signs and their meanings',
    difficulty: 'Beginner',
    points: 100,
    duration: '15 min',
    progress: 0,
    isLocked: false,
    completed: false,
    icon: 'traffic',
    questions: [
      {
        question: 'What does a red octagonal sign indicate?',
        options: ['Stop', 'Yield', 'Slow down', 'No entry'],
        correctAnswer: 0,
        explanation: 'A red octagonal sign always means STOP. You must come to a complete halt.',
      },
      {
        question: 'What does a triangular sign with red border indicate?',
        options: ['Stop', 'Yield', 'Speed limit', 'No parking'],
        correctAnswer: 1,
        explanation: 'A triangular sign with red border means YIELD. You must slow down and give way.',
      },
    ],
  },
  {
    id: 2,
    title: 'Right of Way Rules',
    description: 'Master the rules of right of way at intersections',
    difficulty: 'Beginner',
    points: 150,
    duration: '20 min',
    progress: 0,
    isLocked: false,
    completed: false,
    icon: 'car',
    questions: [
      {
        question: 'Who has the right of way at an uncontrolled intersection?',
        options: [
          'Vehicle on the right',
          'Vehicle on the left',
          'Larger vehicle',
          'Faster vehicle',
        ],
        correctAnswer: 0,
        explanation: 'At an uncontrolled intersection, the vehicle on the right has the right of way.',
      },
    ],
  },
  {
    id: 3,
    title: 'Speed Limits & Zones',
    description: 'Learn about different speed zones and their regulations',
    difficulty: 'Intermediate',
    points: 200,
    duration: '25 min',
    progress: 0,
    isLocked: true,
    completed: false,
    icon: 'warning',
    questions: [
      {
        question: 'What is the speed limit in a school zone?',
        options: ['20 km/h', '25 km/h', '30 km/h', '40 km/h'],
        correctAnswer: 2,
        explanation: 'The speed limit in a school zone is typically 30 km/h during school hours.',
      },
    ],
  },
  {
    id: 4,
    title: 'Lane Discipline',
    description: 'Learn proper lane usage and changing rules',
    difficulty: 'Intermediate',
    points: 200,
    duration: '20 min',
    progress: 0,
    isLocked: true,
    completed: false,
    icon: 'car',
    questions: [
      {
        question: 'When changing lanes, you should:',
        options: [
          'Change quickly without signaling',
          'Signal and check mirrors only',
          'Signal, check mirrors, and blind spots',
          'Only check blind spots',
        ],
        correctAnswer: 2,
        explanation: 'Always signal, check mirrors, and blind spots before changing lanes.',
      },
    ],
  },
  {
    id: 5,
    title: 'Emergency Protocols',
    description: 'Learn how to handle emergency situations',
    difficulty: 'Advanced',
    points: 300,
    duration: '30 min',
    progress: 0,
    isLocked: true,
    completed: false,
    icon: 'warning',
    questions: [
      {
        question: 'What should you do if your brakes fail?',
        options: [
          'Jump out of the vehicle',
          'Pump brakes and use emergency brake',
          'Turn off the engine immediately',
          'Accelerate to safety',
        ],
        correctAnswer: 1,
        explanation: 'If brakes fail, pump them and gradually apply the emergency brake while moving to a safe area.',
      },
    ],
  },
  {
    id: 6,
    title: 'Night Driving',
    description: 'Master the techniques of safe night driving',
    difficulty: 'Advanced',
    points: 250,
    duration: '25 min',
    progress: 0,
    isLocked: true,
    completed: false,
    icon: 'car',
    questions: [
      {
        question: 'When should you use high beam headlights?',
        options: [
          'In city areas',
          'When following another vehicle',
          'On unlit rural roads with no oncoming traffic',
          'In foggy conditions',
        ],
        correctAnswer: 2,
        explanation: 'Use high beams on unlit rural roads when there is no oncoming traffic or vehicles ahead.',
      },
    ],
  },
];

const GamifiedLessons = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.isLocked) {
      setSelectedLesson(lesson);
      setOpenDialog(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      toast.warning('Complete previous lessons to unlock this one!');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLesson(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = selectedLesson?.questions[currentQuestionIndex];
    if (currentQuestion && selectedAnswer === currentQuestion.correctAnswer) {
      toast.success('Correct answer!');
      setShowExplanation(true);
    } else {
      toast.error('Incorrect answer. Try again!');
    }
  };

  const handleNextQuestion = () => {
    if (!selectedLesson) return;

    if (currentQuestionIndex < selectedLesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      toast.success(`Congratulations! You've completed ${selectedLesson.title}`);
      handleCloseDialog();
    }
  };

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'traffic':
        return <TrafficIcon sx={{ fontSize: 40 }} />;
      case 'car':
        return <DirectionsCarIcon sx={{ fontSize: 40 }} />;
      case 'warning':
        return <WarningIcon sx={{ fontSize: 40 }} />;
      default:
        return <DirectionsCarIcon sx={{ fontSize: 40 }} />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Interactive Driving Lessons
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Master driving rules through interactive lessons and quizzes. Complete lessons to unlock advanced topics.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {lessons.map((lesson) => (
          <Grid item xs={12} sm={6} md={4} key={lesson.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                opacity: lesson.isLocked ? 0.7 : 1,
              }}
            >
              <CardActionArea
                onClick={() => handleLessonClick(lesson)}
                sx={{ height: '100%' }}
                disabled={lesson.isLocked}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>
                      {getIconComponent(lesson.icon)}
                    </Box>
                    <Typography variant="h6" component="div">
                      {lesson.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {lesson.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label={lesson.difficulty}
                      color={getDifficultyColor(lesson.difficulty)}
                      size="small"
                    />
                    <Chip
                      label={`${lesson.points} points`}
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label={lesson.duration}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={lesson.progress}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Progress: {lesson.progress}%
                  </Typography>
                </CardContent>
              </CardActionArea>
              {lesson.isLocked && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <LockIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                </Box>
              )}
              {lesson.completed && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                  }}
                >
                  <Tooltip title="Completed">
                    <CheckCircleIcon color="success" />
                  </Tooltip>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedLesson && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getIconComponent(selectedLesson.icon)}
                {selectedLesson.title}
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Question {currentQuestionIndex + 1} of {selectedLesson.questions.length}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={((currentQuestionIndex + 1) / selectedLesson.questions.length) * 100}
                  sx={{ mt: 1 }}
                />
              </Box>
              
              <Typography variant="h6" gutterBottom>
                {selectedLesson.questions[currentQuestionIndex].question}
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {selectedLesson.questions[currentQuestionIndex].options.map((option, index) => (
                  <Grid item xs={12} key={index}>
                    <Button
                      variant={selectedAnswer === index ? 'contained' : 'outlined'}
                      fullWidth
                      onClick={() => setSelectedAnswer(index)}
                      color={
                        showExplanation
                          ? index === selectedLesson.questions[currentQuestionIndex].correctAnswer
                            ? 'success'
                            : 'error'
                          : 'primary'
                      }
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              {showExplanation && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Explanation:</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedLesson.questions[currentQuestionIndex].explanation}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Quit</Button>
              {!showExplanation ? (
                <Button
                  variant="contained"
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNextQuestion}
                  endIcon={<EmojiEventsIcon />}
                >
                  {currentQuestionIndex < selectedLesson.questions.length - 1
                    ? 'Next Question'
                    : 'Complete Lesson'}
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default GamifiedLessons; 
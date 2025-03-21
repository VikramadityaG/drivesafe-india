import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Chip,
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import TrafficIcon from '@mui/icons-material/Traffic';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WarningIcon from '@mui/icons-material/Warning';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SchoolIcon from '@mui/icons-material/School';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

interface Lesson {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  tags: string[];
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Speed Control',
    description: 'Learn to maintain appropriate speed in different conditions',
    icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    category: 'Basic Control',
    difficulty: 'Beginner',
    progress: 0,
    tags: ['Basic Control', 'Beginner'],
  },
  {
    id: 2,
    title: 'Traffic Signals',
    description: 'Master traffic signal rules and right-of-way',
    icon: <TrafficIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    category: 'Traffic Rules',
    difficulty: 'Beginner',
    progress: 0,
    tags: ['Traffic Rules', 'Beginner'],
  },
  {
    id: 3,
    title: 'Lane Discipline',
    description: 'Practice proper lane usage and changing',
    icon: <DirectionsCarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    category: 'Basic Control',
    difficulty: 'Beginner',
    progress: 0,
    tags: ['Basic Control', 'Beginner'],
  },
  {
    id: 4,
    title: 'Road Signs',
    description: 'Learn to identify and respond to road signs',
    icon: <WarningIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    category: 'Traffic Rules',
    difficulty: 'Beginner',
    progress: 0,
    tags: ['Traffic Rules', 'Beginner'],
  },
  {
    id: 5,
    title: 'Parking Skills',
    description: 'Practice different parking techniques',
    icon: <LocalParkingIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    category: 'Advanced Skills',
    difficulty: 'Intermediate',
    progress: 0,
    tags: ['Advanced Skills', 'Intermediate'],
  },
  {
    id: 6,
    title: 'School Zone Rules',
    description: 'Learn special rules for school zones',
    icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    category: 'Traffic Rules',
    difficulty: 'Beginner',
    progress: 0,
    tags: ['Traffic Rules', 'Beginner'],
  },
  {
    id: 7,
    title: 'Night Driving',
    description: 'Master driving in low-light conditions',
    icon: <NightsStayIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    category: 'Advanced Skills',
    difficulty: 'Advanced',
    progress: 0,
    tags: ['Advanced Skills', 'Advanced'],
  },
  {
    id: 8,
    title: 'Emergency Response',
    description: 'Learn to handle emergency situations',
    icon: <ReportProblemIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    category: 'Advanced Skills',
    difficulty: 'Advanced',
    progress: 0,
    tags: ['Advanced Skills', 'Advanced'],
  },
];

const DrivingLessons = () => {
  const [category, setCategory] = useState('All Categories');
  const [difficulty, setDifficulty] = useState('All Difficulties');

  const categories = ['All Categories', 'Basic Control', 'Traffic Rules', 'Advanced Skills'];
  const difficulties = ['All Difficulties', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredLessons = lessons.filter((lesson) => {
    const categoryMatch = category === 'All Categories' || lesson.category === category;
    const difficultyMatch = difficulty === 'All Difficulties' || lesson.difficulty === difficulty;
    return categoryMatch && difficultyMatch;
  });

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

  const handleStartLesson = (lessonId: number) => {
    // Here you would typically navigate to the specific lesson
    console.log(`Starting lesson ${lessonId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Interactive Driving Lessons
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" paragraph>
        Learn driving rules through interactive games and simulations
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficulty}
            label="Difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {difficulties.map((diff) => (
              <MenuItem key={diff} value={diff}>
                {diff}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredLessons.map((lesson) => (
          <Grid item xs={12} sm={6} md={4} key={lesson.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {lesson.icon}
                  <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                    {lesson.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {lesson.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {lesson.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      color={
                        tag === lesson.difficulty
                          ? getDifficultyColor(tag)
                          : 'default'
                      }
                    />
                  ))}
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Progress: {lesson.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={lesson.progress}
                    sx={{ mb: 2 }}
                  />
                </Box>
              </CardContent>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleStartLesson(lesson.id)}
                sx={{ mt: 'auto', mx: 2, mb: 2 }}
              >
                Start Lesson
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DrivingLessons; 
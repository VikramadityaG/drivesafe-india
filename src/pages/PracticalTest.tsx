import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  DirectionsCar as DirectionsCarIcon,
  Warning as WarningIcon,
  SignalCellularAlt as SignalCellularAltIcon,
  Traffic as TrafficIcon,
  PedalBike as PedalBikeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

interface TestScenario {
  id: number;
  name: string;
  description: string;
  duration: number;
  requiredSpeed: number;
  obstacles: Obstacle[];
  successCriteria: string[];
  roadConditions: string[];
}

interface Obstacle {
  type: 'vehicle' | 'pedestrian' | 'trafficLight' | 'stopSign' | 'cyclist';
  position: number; // Distance in meters
  speed?: number; // For moving obstacles
  direction?: 'left' | 'right' | 'straight';
}

const testScenarios: TestScenario[] = [
  {
    id: 1,
    name: 'Urban Driving',
    description: 'Navigate through city traffic with various obstacles and traffic signals.',
    duration: 180,
    requiredSpeed: 30,
    roadConditions: ['Normal', 'Light Rain', 'Traffic'],
    obstacles: [
      { type: 'trafficLight', position: 50 },
      { type: 'vehicle', position: 100, speed: 25, direction: 'straight' },
      { type: 'pedestrian', position: 150, direction: 'right' },
      { type: 'cyclist', position: 200, speed: 15, direction: 'left' },
    ],
    successCriteria: ['Proper traffic signal response', 'Safe pedestrian crossing', 'Maintain safe distance'],
  },
  {
    id: 2,
    name: 'Highway Driving',
    description: 'Handle high-speed scenarios and lane changes on the highway.',
    duration: 240,
    requiredSpeed: 60,
    roadConditions: ['Clear', 'Light Traffic', 'Heavy Traffic'],
    obstacles: [
      { type: 'vehicle', position: 80, speed: 55, direction: 'straight' },
      { type: 'vehicle', position: 150, speed: 65, direction: 'left' },
      { type: 'vehicle', position: 200, speed: 70, direction: 'right' },
    ],
    successCriteria: ['Proper lane changes', 'Speed maintenance', 'Safe overtaking'],
  },
  {
    id: 3,
    name: 'Emergency Response',
    description: 'Handle emergency situations and demonstrate defensive driving.',
    duration: 150,
    requiredSpeed: 40,
    roadConditions: ['Poor Visibility', 'Wet Road', 'Emergency Vehicles'],
    obstacles: [
      { type: 'vehicle', position: 60, speed: 0, direction: 'straight' },
      { type: 'pedestrian', position: 120, direction: 'left' },
      { type: 'trafficLight', position: 180 },
    ],
    successCriteria: ['Quick reaction time', 'Emergency braking', 'Hazard awareness'],
  },
];

const PracticalTest = () => {
  const [currentScenario, setCurrentScenario] = useState<TestScenario | null>(null);
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [testResult, setTestResult] = useState<'pass' | 'fail'>('fail');
  const [currentPosition, setCurrentPosition] = useState(0);
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [currentRoadCondition, setCurrentRoadCondition] = useState('Normal');
  const [detectedObstacles, setDetectedObstacles] = useState<Obstacle[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStatus === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endTest();
            return 0;
          }
          return prev - 1;
        });

        // Update position based on speed
        setCurrentPosition((prev) => prev + (currentSpeed / 3.6)); // Convert km/h to m/s

        // Check for obstacles
        if (currentScenario) {
          const upcomingObstacles = currentScenario.obstacles.filter(
            (obs) => obs.position > currentPosition && obs.position <= currentPosition + 50
          );
          setDetectedObstacles(upcomingObstacles);

          // Generate warnings based on obstacles
          upcomingObstacles.forEach((obstacle) => {
            const distance = obstacle.position - currentPosition;
            if (distance < 20) {
              setWarnings((prev) => [
                ...prev,
                `Warning: ${obstacle.type} detected at ${Math.round(distance)}m ahead`,
              ].slice(-3));
            }
          });
        }

        // Simulate road condition changes
        if (Math.random() < 0.05) {
          const conditions = currentScenario?.roadConditions || ['Normal'];
          setCurrentRoadCondition(conditions[Math.floor(Math.random() * conditions.length)]);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStatus, timeLeft, currentSpeed, currentPosition, currentScenario]);

  const startTest = (scenario: TestScenario) => {
    setCurrentScenario(scenario);
    setTestStatus('running');
    setTimeLeft(scenario.duration);
    setCurrentSpeed(0);
    setWarnings([]);
    setScore(0);
    setShowResult(false);
    setCurrentPosition(0);
    setSteeringAngle(0);
    setCurrentRoadCondition(scenario.roadConditions[0]);
    setDetectedObstacles([]);
  };

  const endTest = () => {
    setTestStatus('completed');
    // Calculate score based on various factors
    const speedScore = Math.max(0, 100 - Math.abs(currentSpeed - (currentScenario?.requiredSpeed || 0)));
    const warningPenalty = warnings.length * 10;
    const obstaclePenalty = detectedObstacles.length * 15;
    const finalScore = Math.max(0, speedScore - warningPenalty - obstaclePenalty);
    setScore(finalScore);
    setTestResult(finalScore >= 70 ? 'pass' : 'fail');
    setShowResult(true);
  };

  const handleSpeedChange = (change: number) => {
    setCurrentSpeed((prev) => Math.max(0, Math.min(120, prev + change)));
  };

  const handleSteeringChange = (angle: number) => {
    setSteeringAngle((prev) => Math.max(-45, Math.min(45, prev + angle)));
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setTestStatus('idle');
  };

  const getObstacleIcon = (type: Obstacle['type']) => {
    switch (type) {
      case 'vehicle':
        return <DirectionsCarIcon />;
      case 'pedestrian':
        return <PersonIcon />;
      case 'cyclist':
        return <PedalBikeIcon />;
      case 'trafficLight':
        return <TrafficIcon />;
      case 'stopSign':
        return <WarningIcon />;
      default:
        return <WarningIcon />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Practical Driving Test
      </Typography>

      {testStatus === 'idle' && (
        <Grid container spacing={3}>
          {testScenarios.map((scenario) => (
            <Grid item xs={12} md={4} key={scenario.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {scenario.name}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {scenario.description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => startTest(scenario)}
                  >
                    Start Test
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {testStatus === 'running' && currentScenario && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Current Scenario: {currentScenario.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SpeedIcon sx={{ mr: 1 }} />
                <Typography>
                  Current Speed: {currentSpeed.toFixed(1)} km/h
                </Typography>
              </Box>
              <Typography>
                Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                Required Speed: {currentScenario.requiredSpeed} km/h
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Road Condition: {currentRoadCondition}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Speed Control</Typography>
                <Slider
                  value={currentSpeed}
                  onChange={(_, value) => setCurrentSpeed(value as number)}
                  min={0}
                  max={120}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSpeedChange(5)}
                  >
                    Accelerate
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleSpeedChange(-5)}
                  >
                    Brake
                  </Button>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Steering Control</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Tooltip title="Turn Left">
                    <IconButton onClick={() => handleSteeringChange(-5)}>
                      <DirectionsCarIcon sx={{ transform: 'rotate(90deg)' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Turn Right">
                    <IconButton onClick={() => handleSteeringChange(5)}>
                      <DirectionsCarIcon sx={{ transform: 'rotate(-90deg)' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {warnings.length > 0 && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {warnings[warnings.length - 1]}
                </Alert>
              )}

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Detected Obstacles:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {detectedObstacles.map((obstacle, index) => (
                    <Tooltip
                      key={index}
                      title={`${obstacle.type} at ${Math.round(obstacle.position - currentPosition)}m`}
                    >
                      <IconButton size="small">
                        {getObstacleIcon(obstacle.type)}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="error"
                onClick={endTest}
                sx={{ mt: 2 }}
              >
                End Test Early
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Dialog open={showResult} onClose={handleCloseResult}>
        <DialogTitle>
          Test Results
          {testResult === 'pass' ? (
            <CheckCircleIcon color="success" sx={{ ml: 1 }} />
          ) : (
            <ErrorIcon color="error" sx={{ ml: 1 }} />
          )}
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Score: {score}%
          </Typography>
          <Typography color={testResult === 'pass' ? 'success.main' : 'error.main'}>
            {testResult === 'pass' ? 'Congratulations! You passed the test.' : 'You did not meet the passing criteria.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResult}>Close</Button>
          <Button
            variant="contained"
            onClick={handleCloseResult}
          >
            Try Another Test
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PracticalTest; 
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const features = [
  {
    title: 'Digital Process',
    description: 'Apply for your license online with our streamlined digital process.',
    icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Expert Training',
    description: 'Access comprehensive training materials and expert guidance.',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Secure System',
    description: 'Your data is protected with state-of-the-art security measures.',
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Fast Processing',
    description: 'Quick verification and processing of your application.',
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" align="center" gutterBottom>
            Welcome to DriveSafe India
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Your trusted partner in obtaining a driving license through a transparent and efficient process
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/apply')}
            >
              Apply Now
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/how-it-works')}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Why Choose DriveSafe India?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" paragraph>
              Join thousands of successful applicants who have obtained their driving license through DriveSafe India.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BadgeIcon from '@mui/icons-material/Badge';

const steps = [
  {
    label: 'Register and Complete Profile',
    description: 'Create an account and fill in your personal details. Link your Aadhaar for identity verification.',
    icon: <PersonIcon />,
  },
  {
    label: 'Book Training Sessions',
    description: 'Schedule training at an approved driving school or complete our online theory courses.',
    icon: <SchoolIcon />,
  },
  {
    label: 'Book Test Date',
    description: 'Select your preferred testing center and available time slot.',
    icon: <EventIcon />,
  },
  {
    label: 'Take Automated Test',
    description: 'Complete computer-based theory test and sensor-monitored practical driving test.',
    icon: <AssignmentIcon />,
  },
  {
    label: 'Receive Digital License',
    description: 'Upon passing, receive your digital license immediately with a physical copy mailed to your address.',
    icon: <BadgeIcon />,
  },
];

const HowItWorks = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h1" align="center" gutterBottom>
        How It Works
      </Typography>

      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Follow these simple steps to get your driving license
      </Typography>

      <Box sx={{ mt: 8 }}>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index} active={true}>
              <StepLabel StepIconComponent={() => (
                <Box sx={{ color: 'primary.main' }}>
                  {step.icon}
                </Box>
              )}>
                <Typography variant="h6">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography color="text.secondary">
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Required Documents
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Identity Documents
              </Typography>
              <ul>
                <li>Aadhaar Card</li>
                <li>PAN Card</li>
                <li>Passport (if available)</li>
                <li>Voter ID (if available)</li>
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Address Proof
              </Typography>
              <ul>
                <li>Utility Bill (Electricity/Water)</li>
                <li>Bank Statement</li>
                <li>Rent Agreement</li>
                <li>Property Tax Receipt</li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HowItWorks; 
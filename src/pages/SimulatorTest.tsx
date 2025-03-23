import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SensorsIcon from '@mui/icons-material/Sensors';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { styled } from '@mui/material/styles';

const locations = [
  'RTO Office - New Delhi',
  'RTO Office - Mumbai',
];

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
];

const steps = [
  'Select Location',
  'Choose Date',
  'Select Time Slot',
  'Confirm Booking',
];

const TimeSlotButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '16px',
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '8px',
  color: theme.palette.primary.main,
  '&.selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-iconContainer': {
    '& .MuiStepIcon-root': {
      color: '#E0E0E0',
      '&.Mui-active': {
        color: theme.palette.primary.main,
      },
      '&.Mui-completed': {
        color: theme.palette.primary.main,
      },
    },
  },
}));

const CustomStepIcon = (props: any) => {
  const { completed } = props;
  return completed ? <CheckCircleIcon color="primary" /> : null;
};

const SimulatorTest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    location: '',
    date: '',
    timeSlot: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const isStepComplete = () => {
    switch (activeStep) {
      case 0:
        return !!bookingData.location;
      case 1:
        return !!bookingData.date;
      case 2:
        return !!bookingData.timeSlot;
      default:
        return true;
    }
  };

  const handleConfirmBooking = () => {
    // Here you would typically make an API call to save the booking
    console.log('Form submitted:', bookingData);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset the form after 2 seconds
    setTimeout(() => {
      setBookingData({
        location: '',
        date: '',
        timeSlot: '',
      });
      setActiveStep(0);
      setShowSuccess(false);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <FormControl fullWidth>
            <Select
              value={bookingData.location}
              onChange={(e) =>
                setBookingData({ ...bookingData, location: e.target.value as string })
              }
              displayEmpty
              sx={{
                minWidth: 300,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Location
              </MenuItem>
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 1:
        return (
          <TextField
            type="date"
            fullWidth
            value={bookingData.date}
            onChange={(e) =>
              setBookingData({ ...bookingData, date: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            sx={{
              minWidth: 300,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
          />
        );
      case 2:
        return (
          <Grid container spacing={2}>
            {timeSlots.map((slot) => (
              <Grid item xs={12} sm={6} key={slot}>
                <TimeSlotButton
                  className={bookingData.timeSlot === slot ? 'selected' : ''}
                  onClick={() => setBookingData({ ...bookingData, timeSlot: slot })}
                >
                  {slot}
                </TimeSlotButton>
              </Grid>
            ))}
          </Grid>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Review Your Booking</Typography>
            
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Booking Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Location</Typography>
                    <Typography>{bookingData.location}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">
                      Date: {new Date(bookingData.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Time</Typography>
                    <Typography>{bookingData.timeSlot}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Simulator Test
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" paragraph>
        Experience our state-of-the-art driving simulator for comprehensive vehicle testing
      </Typography>

      {/* Simulator Features Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Advanced Simulator System
        </Typography>
        <Typography variant="body1" paragraph>
          Our simulator system is designed to provide a 100% realistic driving experience while ensuring complete security and eliminating human intervention. Here's how we achieve this:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Security Features
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Biometric Authentication"
                      secondary="Fingerprint and facial recognition for candidate verification"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="AI-Powered Monitoring"
                      secondary="Real-time behavior analysis to detect any suspicious activities"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Secure Data Transmission"
                      secondary="End-to-end encryption for all test data and results"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  <DirectionsCarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Realistic Simulation
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <SpeedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Advanced Physics Engine"
                      secondary="Accurate vehicle dynamics and road conditions simulation"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SensorsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Multi-Sensory Feedback"
                      secondary="Realistic force feedback, sound, and visual effects"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Vehicle-Specific Testing"
                      secondary="Support for all vehicle types (car, motorcycle, truck, bus)"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom color="primary">
          How It Works
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Automated Testing Process"
              secondary="The entire test is conducted by our AI system, eliminating human bias and intervention"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Real-Time Assessment"
              secondary="Continuous evaluation of driving skills, traffic rule adherence, and safety practices"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Comprehensive Test Scenarios"
              secondary="Tests cover various driving conditions, weather, and emergency situations"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Instant Results"
              secondary="Detailed performance report generated immediately after test completion"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Booking Section */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Book Your Simulator Test
        </Typography>
        <Typography variant="body1" paragraph>
          Select your preferred location and time slot for the simulator test
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StyledStepLabel StepIconComponent={CustomStepIcon}>
                {label}
              </StyledStepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, mb: 4 }}>
          {renderStepContent()}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleConfirmBooking}
              sx={{
                borderRadius: '20px',
                px: 4,
              }}
            >
              Confirm Booking
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepComplete()}
              sx={{
                borderRadius: '20px',
                px: 4,
                backgroundColor: !isStepComplete() ? '#E0E0E0' : undefined,
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>

      {/* Add Snackbar for success notification */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Booking confirmed successfully! You will receive a confirmation email shortly.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SimulatorTest; 
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
  Snackbar,
  Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Booking Summary
            </Typography>
            <Typography sx={{ mb: 2 }}>Location: {bookingData.location}</Typography>
            <Typography sx={{ mb: 2 }}>
              Date: {new Date(bookingData.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Typography>
            <Typography sx={{ mb: 2 }}>Time: {bookingData.timeSlot}</Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Book Simulator Test
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" paragraph>
        Select your preferred location, date, and time slot for the simulator test
      </Typography>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StyledStepLabel
                StepIconComponent={index < activeStep ? CustomStepIcon : undefined}
              >
                {label}
              </StyledStepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
          {renderStepContent()}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
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
              disabled={!isStepComplete()}
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

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Booking confirmed successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SimulatorTest; 
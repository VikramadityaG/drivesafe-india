import React from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { styled } from '@mui/material/styles';

const steps = [
  'Apply for Learner\'s License',
  'Take Theory Test',
  'Complete Simulator Training',
  'Apply for Driving License',
  'Get Your License',
];

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

const HowItWorks = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        How It Works
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" paragraph>
        Follow these simple steps to get your driving license in India
      </Typography>

      {/* Process Steps */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Stepper activeStep={-1} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StyledStepLabel>{label}</StyledStepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  <DirectionsCarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Learner's License
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Apply Online"
                      secondary="Fill out the application form with required documents"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Document Verification"
                      secondary="Submit proof of age, address, and identity"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Theory Test"
                      secondary="Take the online theory test to get your learner's license"
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
                  <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Training & Testing
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Simulator Training"
                      secondary="Complete mandatory simulator training sessions"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Practical Training"
                      secondary="Learn driving skills from certified instructors"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Final Test"
                      secondary="Take the practical driving test"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Requirements Section */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Required Documents
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Identity Proof
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Aadhaar Card" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="PAN Card" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Passport" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Address Proof
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Utility Bill" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Bank Statement" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Rental Agreement" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Additional Documents
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Medical Certificate" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Passport Size Photos" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Application Form" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Important Notes */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Important Notes
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Age Requirements"
              secondary="Must be at least 18 years old for a car license and 16 years for a motorcycle license"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Validity"
              secondary="Learner's license is valid for 6 months from the date of issue"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Training Period"
              secondary="Minimum 30 days of training required before applying for a permanent license"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Test Requirements"
              secondary="Must pass both theory and practical tests to obtain the license"
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default HowItWorks; 
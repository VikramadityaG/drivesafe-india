import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Card,
  CardContent,
  Input,
  Chip,
  Alert,
  StepIconProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import ArticleIcon from '@mui/icons-material/Article';
import RateReviewIcon from '@mui/icons-material/RateReview';

const steps = [
  'Personal Details',
  'Vehicle Information',
  'Document Upload',
  'Review & Submit'
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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface VehicleDetails {
  hasVehicle: string;
  vehicleType?: string;
  registrationNumber?: string;
  manufacturer?: string;
  model?: string;
  yearOfManufacture?: string;
}

interface Documents {
  idProof: File | null;
  addressProof: File | null;
  photo: File | null;
  medicalCertificate: File | null;
}

const CustomStepIcon: React.FC<StepIconProps> = (props) => {
  const { active, completed } = props;
  
  if (completed) {
    return <CheckCircleIcon color="primary" />;
  }
  
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: active ? 'primary.main' : '#E0E0E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'white' : 'text.secondary',
      }}
    >
      {props.icon}
    </Box>
  );
};

const ApplyLicense = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    hasVehicle: '',
  });
  const [documents, setDocuments] = useState<Documents>({
    idProof: null,
    addressProof: null,
    photo: null,
    medicalCertificate: null,
  });

  const handleNext = () => {
    if (activeStep === 1) {
      setActiveStep((prev) => prev + 1); // Always go to document upload step
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', {
      personalDetails,
      vehicleDetails,
      documents,
    });
    setShowSuccess(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setActiveStep(0);
      setPersonalDetails({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
      setVehicleDetails({
        hasVehicle: '',
      });
      setDocuments({
        idProof: null,
        addressProof: null,
        photo: null,
        medicalCertificate: null,
      });
    }, 3000);
  };

  const handleFileUpload = (documentType: keyof Documents) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setDocuments(prev => ({
        ...prev,
        [documentType]: event.target.files![0]
      }));
    }
  };

  const isStepComplete = () => {
    switch (activeStep) {
      case 0:
        return Object.values(personalDetails).every(value => value.trim() !== '');
      case 1:
        if (vehicleDetails.hasVehicle === 'no') return true;
        if (vehicleDetails.hasVehicle === 'yes') {
          return ['vehicleType', 'registrationNumber', 'manufacturer', 'model', 'yearOfManufacture']
            .every(key => vehicleDetails[key as keyof VehicleDetails]);
        }
        return false;
      case 2:
        return Object.values(documents).every(doc => doc !== null);
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={personalDetails.name}
                onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={personalDetails.email}
                onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={personalDetails.phone}
                onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={4}
                value={personalDetails.address}
                onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value })}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Box>
            <FormControl component="fieldset">
              <FormLabel component="legend">Do you own a vehicle?</FormLabel>
              <RadioGroup
                value={vehicleDetails.hasVehicle}
                onChange={(e) => setVehicleDetails({ hasVehicle: e.target.value })}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {vehicleDetails.hasVehicle === 'yes' && (
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Vehicle Type"
                    value={vehicleDetails.vehicleType || ''}
                    onChange={(e) => setVehicleDetails({ ...vehicleDetails, vehicleType: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Registration Number"
                    value={vehicleDetails.registrationNumber || ''}
                    onChange={(e) => setVehicleDetails({ ...vehicleDetails, registrationNumber: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Manufacturer"
                    value={vehicleDetails.manufacturer || ''}
                    onChange={(e) => setVehicleDetails({ ...vehicleDetails, manufacturer: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Model"
                    value={vehicleDetails.model || ''}
                    onChange={(e) => setVehicleDetails({ ...vehicleDetails, model: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Year of Manufacture"
                    value={vehicleDetails.yearOfManufacture || ''}
                    onChange={(e) => setVehicleDetails({ ...vehicleDetails, yearOfManufacture: e.target.value })}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            {[
              { key: 'idProof', label: 'ID Proof', icon: ArticleIcon },
              { key: 'addressProof', label: 'Address Proof', icon: ArticleIcon },
              { key: 'photo', label: 'Recent Photograph', icon: ArticleIcon },
              { key: 'medicalCertificate', label: 'Medical Certificate', icon: ArticleIcon },
            ].map(({ key, label, icon: Icon }) => (
              <Grid item xs={12} md={6} key={key}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Icon color="primary" sx={{ fontSize: 40 }} />
                      <Typography variant="h6">{label}</Typography>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                        <VisuallyHiddenInput
                          type="file"
                          onChange={handleFileUpload(key as keyof Documents)}
                        />
                      </Button>
                      {documents[key as keyof Documents] && (
                        <Chip
                          label={documents[key as keyof Documents]?.name}
                          onDelete={() => setDocuments(prev => ({ ...prev, [key]: null }))}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Review Your Application</Typography>
            
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Personal Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Name</Typography>
                    <Typography>{personalDetails.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Email</Typography>
                    <Typography>{personalDetails.email}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Phone</Typography>
                    <Typography>{personalDetails.phone}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Address</Typography>
                    <Typography>{personalDetails.address}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {vehicleDetails.hasVehicle === 'yes' && (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Vehicle Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Vehicle Type</Typography>
                      <Typography>{vehicleDetails.vehicleType}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Registration Number</Typography>
                      <Typography>{vehicleDetails.registrationNumber}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Manufacturer</Typography>
                      <Typography>{vehicleDetails.manufacturer}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Model</Typography>
                      <Typography>{vehicleDetails.model}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Year of Manufacture</Typography>
                      <Typography>{vehicleDetails.yearOfManufacture}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Uploaded Documents
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(documents).map(([key, file]) => (
                    <Grid item xs={12} sm={6} key={key}>
                      <Typography variant="subtitle2">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Typography>
                      <Typography>{file?.name || 'Not uploaded'}</Typography>
                    </Grid>
                  ))}
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
        Apply for License
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" paragraph>
        Complete all steps to submit your license application
      </Typography>

      {showSuccess && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 2,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h6">
            Application Submitted Successfully!
          </Typography>
        </Alert>
      )}

      <Paper sx={{ p: 4, mt: 4 }}>
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
              onClick={handleSubmit}
              sx={{
                borderRadius: '20px',
                px: 4,
              }}
            >
              Submit Application
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
    </Container>
  );
};

export default ApplyLicense; 
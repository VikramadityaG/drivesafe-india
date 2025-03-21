import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import WarningIcon from '@mui/icons-material/Warning';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'apply':
        navigate('/apply');
        break;
      case 'theory':
        navigate('/theory-test');
        break;
      case 'practical':
        navigate('/practical-test');
        break;
      case 'documents':
        navigate('/documents');
        break;
      default:
        break;
    }
  };

  const applicationStatus = {
    status: 'pending',
    nextStep: 'Complete Theory Test',
    progress: 40,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome, {user?.firstName}!
            </Typography>
            <Typography color="text.secondary">
              Track your license application progress and access important information here.
            </Typography>
          </Paper>
        </Grid>

        {/* Application Status */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Application Status
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {applicationStatus.status === 'pending' ? (
                <PendingIcon color="warning" sx={{ mr: 1 }} />
              ) : applicationStatus.status === 'approved' ? (
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              ) : (
                <WarningIcon color="error" sx={{ mr: 1 }} />
              )}
              <Typography variant="h6">
                {applicationStatus.status.charAt(0).toUpperCase() + applicationStatus.status.slice(1)}
              </Typography>
            </Box>
            <Typography color="text.secondary" paragraph>
              Next Step: {applicationStatus.nextStep}
            </Typography>
            <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 8, mb: 2 }}>
              <Box
                sx={{
                  width: `${applicationStatus.progress}%`,
                  bgcolor: 'primary.main',
                  height: '100%',
                  borderRadius: 1,
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Progress: {applicationStatus.progress}%
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItem button onClick={() => handleActionClick('apply')}>
                <ListItemIcon>
                  <DirectionsCarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Apply for License" />
              </ListItem>
              <ListItem button onClick={() => handleActionClick('theory')}>
                <ListItemIcon>
                  <SchoolIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Take Theory Test" />
              </ListItem>
              <ListItem button onClick={() => handleActionClick('practical')}>
                <ListItemIcon>
                  <AssignmentIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Practical Test" />
              </ListItem>
              <ListItem button onClick={() => handleActionClick('documents')}>
                <ListItemIcon>
                  <DescriptionIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Upload Documents" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Document Upload"
                  secondary="Medical Certificate uploaded"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Theory Test"
                  secondary="Completed with 85% score"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <DirectionsCarIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Application Submitted"
                  secondary="Your application has been received"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 
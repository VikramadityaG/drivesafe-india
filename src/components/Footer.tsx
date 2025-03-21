import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
    ],
    services: [
      { label: 'Apply for License', path: '/apply' },
      { label: 'Theory Test', path: '/theory-test' },
      { label: 'Practical Test', path: '/practical-test' },
      { label: 'Document Upload', path: '/documents' },
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'FAQs', path: '/faqs' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              DriveSafe India
            </Typography>
            <Typography variant="body2" paragraph>
              Transforming India's driving license system through technology and transparency.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {footerLinks.company.map((link) => (
                <Box component="li" key={link.path} sx={{ mb: 1 }}>
                  <Link
                    component="button"
                    variant="body2"
                    color="inherit"
                    onClick={() => navigate(link.path)}
                    sx={{ textDecoration: 'none' }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {footerLinks.services.map((link) => (
                <Box component="li" key={link.path} sx={{ mb: 1 }}>
                  <Link
                    component="button"
                    variant="body2"
                    color="inherit"
                    onClick={() => navigate(link.path)}
                    sx={{ textDecoration: 'none' }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {footerLinks.support.map((link) => (
                <Box component="li" key={link.path} sx={{ mb: 1 }}>
                  <Link
                    component="button"
                    variant="body2"
                    color="inherit"
                    onClick={() => navigate(link.path)}
                    sx={{ textDecoration: 'none' }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph>
              Email: support@drivesafeindia.com
            </Typography>
            <Typography variant="body2" paragraph>
              Phone: +91 1234567890
            </Typography>
            <Typography variant="body2">
              Address: 123 Main Street, New Delhi, India
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} DriveSafe India. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 
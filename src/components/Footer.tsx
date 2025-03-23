import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = [
    {
      title: 'Services',
      links: [
        { label: 'Apply License', path: '/apply-license' },
        { label: 'Driving Lessons', path: '/driving-lessons' },
        { label: 'Theory Test', path: '/theory-test' },
        { label: 'Simulator Test', path: '/simulator-test' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'How It Works', path: '/how-it-works' },
        { label: 'FAQs', path: '/faqs' },
        { label: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Refund Policy', path: '/refund' },
      ],
    },
  ];

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
          {footerLinks.map((section) => (
            <Grid item xs={12} sm={4} key={section.title}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <List>
                {section.links.map((link) => (
                  <ListItem key={link.path} disablePadding>
                    <ListItemButton
                      onClick={() => navigate(link.path)}
                      sx={{
                        color: 'white',
                        '&:hover': {
                          color: 'secondary.main',
                        },
                      }}
                    >
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} DriveSafe India. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 
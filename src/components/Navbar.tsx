import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    handleClose();
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    ...(user
      ? [
          { label: 'Apply', path: '/apply' },
          { label: 'Driving Lessons', path: '/driving-lessons' },
          { label: 'Theory Test', path: '/theory-test' },
          { label: 'Practical Test', path: '/practical-test' },
          { label: 'Simulator Test', path: '/simulator-test' },
        ]
      : []),
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          DriveSafe India
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
          {user ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.firstName ? user.firstName[0] : 'U'}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { navigate('/apply'); handleClose(); }}>
                  Apply for License
                </MenuItem>
                <MenuItem onClick={() => { navigate('/driving-lessons'); handleClose(); }}>
                  Driving Lessons
                </MenuItem>
                <MenuItem onClick={() => { navigate('/theory-test'); handleClose(); }}>
                  Theory Test
                </MenuItem>
                <MenuItem onClick={() => { navigate('/practical-test'); handleClose(); }}>
                  Practical Test
                </MenuItem>
                <MenuItem onClick={() => { navigate('/simulator-test'); handleClose(); }}>
                  Simulator Test
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMobileMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="mobile-menu"
            anchorEl={mobileAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(mobileAnchorEl)}
            onClose={handleClose}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  handleClose();
                }}
              >
                {item.label}
              </MenuItem>
            ))}
            {user ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <>
                <MenuItem onClick={() => { navigate('/login'); handleClose(); }}>
                  Login
                </MenuItem>
                <MenuItem onClick={() => { navigate('/register'); handleClose(); }}>
                  Register
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 
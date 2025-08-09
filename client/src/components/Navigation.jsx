import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import {
  Home,
  Dashboard,
  Info,
  Settings,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeMode } from '../theme/ThemeContext';
import { motion } from 'framer-motion';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeMode();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Dashboard },
    { path: '/about', label: 'About', icon: Info },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <AppBar position='static'>
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Typography
              variant='h4'
              component='div'
              sx={{
                cursor: 'pointer',
                fontWeight: 800,
                background: mode === 'light' 
                  ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
                  : 'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: mode === 'dark' ? 'brightness(1.3)' : 'none',
              }}
              onClick={() => navigate('/')}
            >
              MoodPlate
            </Typography>
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navItems.map(({ path, label, icon: Icon }, index) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  startIcon={<Icon />}
                  onClick={() => navigate(path)}
                  sx={{
                    color: mode === 'light' ? '#dc2626' : 'white',
                    backgroundColor:
                      location.pathname === path
                        ? mode === 'light'
                          ? 'rgba(220, 38, 38, 0.1)'
                          : 'rgba(255,255,255,0.15)'
                        : 'transparent',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: mode === 'light'
                        ? 'rgba(220, 38, 38, 0.1)'
                        : 'rgba(255,255,255,0.15)',
                      transform: 'translateY(-2px)',
                    },
                    '& .MuiButton-startIcon': {
                      mr: 1,
                    },
                  }}
                >
                  {label}
                </Button>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton
                onClick={toggleTheme}
                sx={{
                  ml: 2,
                  p: 1.5,
                  borderRadius: 2,
                  color: mode === 'light' ? '#dc2626' : 'white', // Red in light mode, white in dark mode
                  backgroundColor: mode === 'light'
                    ? 'rgba(220, 38, 38, 0.1)' // Light red background in light mode
                    : 'rgba(255,255,255,0.1)', // White background in dark mode
                  '&:hover': {
                    backgroundColor: mode === 'light'
                      ? 'rgba(220, 38, 38, 0.2)' // Darker red hover in light mode
                      : 'rgba(255,255,255,0.2)', // Darker white hover in dark mode
                  },
                }}
                title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
              >
                {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navigation;

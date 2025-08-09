import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { CustomThemeProvider } from './theme/ThemeContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            bgcolor: 'background.default',
          }}
        >
          <Navigation />
          <Box component='main' sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/about' element={<About />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </CustomThemeProvider>
  );
}

import React from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Dashboard as DashboardIcon } from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <HomeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to MoodPlate
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          The perfect meals & music for how you feel
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 300, maxWidth: 400 }}>
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <DashboardIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Get Started
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Access the dashboard to track your mood and get personalized meal and music recommendations.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{ borderRadius: 2 }}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 300, maxWidth: 400 }}>
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Smart Features
            </Typography>
            <Typography variant="body1" color="text.secondary">
            MoodPlate intelligently recommends meals and music based on your current mood, the weather, and the ingredients you have at home. Just tell it how you’re feeling and what ingredients you have, and it’ll serve you the perfect vibe for both your plate and playlist.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;

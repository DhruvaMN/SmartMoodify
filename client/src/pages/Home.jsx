import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
  MusicNote as MusicIcon,
  EmojiEmotions as EmojiIcon,
} from '@mui/icons-material';
import {
  AnimatedBox,
  AnimatedCard,
  FloatingIcon,
  PulseButton,
  StaggeredList,
  StaggeredListItem,
} from '../components/MotionComponents';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <EmojiIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Mood Detection',
      description:
        'Our AI understands your emotions and curates perfect recommendations.',
    },
    {
      icon: <RestaurantIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Smart Recipes',
      description:
        'Get personalized meal suggestions based on your ingredients and mood.',
    },
    {
      icon: <MusicIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Perfect Playlists',
      description:
        'Discover music that matches your vibe and enhances your dining experience.',
    },
  ];

  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <AnimatedBox>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <FloatingIcon delay={0}>
            <HomeIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          </FloatingIcon>
          <Typography
            variant='h1'
            component='h1'
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 2,
              color: 'primary.main',
              textShadow: (theme) => 
                theme.palette.mode === 'light' 
                  ? '0 2px 4px rgba(0,0,0,0.1)' 
                  : '0 2px 4px rgba(255,255,255,0.1)',
            }}
          >
            Welcome to MoodPlate
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{
              mb: 6,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            The perfect meals & music for how you feel
          </Typography>
        </Box>
      </AnimatedBox>

      <StaggeredList>
        <Grid container spacing={4} sx={{ mb: 8 }} justifyContent='center'>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StaggeredListItem index={index}>
                <AnimatedCard delay={index}>
                  <CardContent sx={{ textAlign: 'center', p: 4, maxWidth: 300 }}>
                    <FloatingIcon delay={index * 0.5}>
                      {feature.icon}
                    </FloatingIcon>
                    <Typography
                      variant='h6'
                      component='h3'
                      gutterBottom
                      sx={{ mt: 2, fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='text.secondary'
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </StaggeredListItem>
            </Grid>
          ))}
        </Grid>
      </StaggeredList>

      <AnimatedBox>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Grid container spacing={4} sx={{ maxWidth: 1000, justifyContent: 'center' }}>
            <Grid item xs={12} md={6}>
              <AnimatedCard delay={1}>
                <CardContent sx={{ textAlign: 'center', p: 4, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <FloatingIcon delay={1}>
                    <DashboardIcon
                      sx={{ fontSize: 60, color: 'primary.main', mb: 3 }}
                    />
                  </FloatingIcon>
                  <Typography
                    variant='h4'
                    component='h2'
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Get Started
                  </Typography>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mb: 4, lineHeight: 1.6, flexGrow: 1 }}
                  >
                    Access the dashboard to track your mood and get personalized
                    meal and music recommendations.
                  </Typography>
                  <PulseButton>
                    <Button
                      variant='contained'
                      size='large'
                      onClick={() => navigate('/dashboard')}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                      }}
                    >
                      Go to Dashboard
                    </Button>
                  </PulseButton>
                </CardContent>
              </AnimatedCard>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <AnimatedCard delay={2}>
                <CardContent sx={{ textAlign: 'center', p: 4, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography
                    variant='h4'
                    component='h2'
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Smart Features
                  </Typography>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
                  >
                    MoodPlate intelligently recommends meals and music based on your
                    current mood and the ingredients you have at home.
                    Just tell it how you're feeling and what ingredients you have,
                    and it'll serve you the perfect vibe for both your plate and
                    playlist.
                  </Typography>
                </CardContent>
              </AnimatedCard>
            </Grid>
          </Grid>
        </Box>
      </AnimatedBox>
    </Container>
  );
};

export default Home;

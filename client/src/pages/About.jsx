import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Link,
  Paper,
} from '@mui/material';
import {
  Info,
  Psychology,
  MusicNote,
  Cloud,
  Restaurant,
  Security,
  Code,
  Api,
  Storage,
} from '@mui/icons-material';
import {
  AnimatedBox,
  AnimatedCard,
  FloatingIcon,
  StaggeredList,
  StaggeredListItem,
  AnimatedGridItem,
} from '../components/MotionComponents';

const About = () => {
  const apis = [
    {
      icon: <Psychology sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Hugging Face',
      description:
        'Used for detecting emotion from user input and classifying recipe "vibes".',
      color: 'primary',
    },
    {
      icon: <Restaurant sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Spoonacular',
      description:
        'Provides recipe recommendations based on ingredients and dietary preferences.',
      color: 'secondary',
    },
    {
      icon: <MusicNote sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Spotify',
      description:
        "Recommends music tracks that match the user's mood and preferences.",
      color: 'info',
    },
  ];

  const features = [
    {
      title: 'Emotion-Aware AI',
      description:
        "Advanced emotion detection using Hugging Face's classification models to understand your mood and provide contextually relevant suggestions.",
    },
    {
      title: 'Smart Recipe Matching',
      description:
        'Intelligent recipe recommendations that consider your available ingredients, dietary preferences, and current emotional state.',
    },
    {
      title: 'Mood-Based Music',
      description:
        'Curated music playlists that complement your mood and enhance your dining experience with perfectly matched tracks.',
    },
  ];

  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <AnimatedBox>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <FloatingIcon>
            <Info sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          </FloatingIcon>
          <Typography
            variant='h1'
            component='h1'
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 3,
              color: 'primary.main',
              textShadow: (theme) => 
                theme.palette.mode === 'light' 
                  ? '0 2px 4px rgba(0,0,0,0.1)' 
                  : '0 2px 4px rgba(255,255,255,0.1)',
            }}
          >
            About SmartMoodify
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Moodplate is a full-stack application that curates personalized
            meals and music based on your emotions, local weather, and available
            ingredients—enhancing your daily experience through emotionally
            intelligent technology.
          </Typography>
        </Box>
      </AnimatedBox>

      <StaggeredList>
      <Box sx={{ mb: 3 }}>
        <AnimatedCard delay={0}>
            <Paper sx={{ p: 5 }}>
            <Typography
              variant='h3'
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Why It Was Built
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
            >
              We believe food and music have the power to elevate your mood.
              SmartMoodify was created to combine emotion-aware AI and smart
              APIs to help people decide what to eat and listen to, especially
              when they feel overwhelmed or indecisive.
            </Typography>
            </Paper>
        </AnimatedCard>
      </Box>

      <Box sx={{ mb: 3 }}>
        <AnimatedCard delay={1}>
          <Paper sx={{ p: 5}}>
            <Typography
              variant='h3'
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              What Problems It Solves
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
            >
              Choosing what to eat or listen to can be frustrating when you're
              not sure what matches your mood or energy. SmartMoodify takes away
              the decision fatigue by making emotionally and contextually
              relevant suggestions—no endless scrolling or second-guessing.
            </Typography>
          </Paper>
        </AnimatedCard>
      </Box>

      <Box sx={{ mb: 3 }}>
        <AnimatedCard delay={2}>
          <Paper sx={{ p: 5 }}>
            <Typography
              variant='h3'
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              How It Works
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                "You describe how you're feeling in natural language and list available ingredients.",
                "The app detects your mood using Hugging Face's emotion classification model.",
                'Spoonacular suggests recipes using your ingredients.',
                'Hugging Face scores those recipes for emotional relevance.',
                'Spotify recommends music that matches your vibe.',
              ].map((step, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      mt: 0.5,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}
                  >
                    {step}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </AnimatedCard>
      </Box>

      <Box sx={{ mb: 3 }}>
        <AnimatedCard delay={3}>
          <Paper sx={{ p: 5, border: 'none', boxShadow: (theme) => theme.palette.mode === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : '0 4px 20px rgba(0,0,0,0.3)' }}>
            <Typography
              variant='h3'
              gutterBottom
              sx={{ fontWeight: 700, mb: 4 }}
            >
              Key Features
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <AnimatedGridItem index={index}>
                    <Box sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: 2,
                      backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                      border: 'none',
                      outline: 'none'
                    }}>
                      <Typography
                        variant='h5'
                        gutterBottom
                        sx={{ fontWeight: 600, mb: 2 }}
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
                    </Box>
                  </AnimatedGridItem>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </AnimatedCard>
      </Box>

      <Box sx={{ mb: 3 }}>
        <AnimatedCard delay={4}>
          <Paper sx={{ 
            p: 5, 
            border: 'none', 
            boxShadow: (theme) => theme.palette.mode === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <Typography
              variant='h3'
              gutterBottom
              sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}
            >
              APIs and Tools Used
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container spacing={4} sx={{ maxWidth: 900 }} justifyContent='center' >
                {apis.map((api, index) => (
                  <Grid item xs={12} sm={4} key={index} maxWidth={900} width='100%'>
                    <AnimatedGridItem index={index}>
                      <Card sx={{ 
                        height: '100%', 
                        textAlign: 'center',
                        border: 'none',
                        outline: 'none',
                        boxShadow: (theme) => theme.palette.mode === 'light' ? '0 2px 12px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.2)',
                        
                      }}>
                        <CardContent sx={{ p: 4 }}>
                          <FloatingIcon delay={index * 0.2}>
                            {api.icon}
                          </FloatingIcon>
                          <Typography
                            variant='h6'
                            sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: 20 }}
                          >
                            {api.title}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{ lineHeight: 1.6, fontSize: 16 }}
                          >
                            {api.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </AnimatedGridItem>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </AnimatedCard>
      </Box>
      </StaggeredList>
    </Container>
  );
};

export default About;

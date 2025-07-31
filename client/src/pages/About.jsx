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
} from '@mui/material';
import {
  Info,
  Psychology,
  MusicNote,
  Cloud,
  Restaurant,
  Security,
} from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Info sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant='h2' component='h1' gutterBottom>
          About MoodPlate
        </Typography>
        <Typography
          variant='h6'
          color='text.secondary'
          sx={{ maxWidth: 700, mx: 'auto' }}
        >
          Moodplate is a full-stack application that curates personalized
          meals and music based on your emotions, local weather, and available
          ingredients—enhancing your daily experience through emotionally
          intelligent technology.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant='h4' gutterBottom>
          Why It Was Built
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          We believe food and music have the power to elevate your mood.
          SmartMoodify was created to combine emotion-aware AI and smart APIs to
          help people decide what to eat and listen to, especially when they
          feel overwhelmed or indecisive.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant='h4' gutterBottom>
          What Problems It Solves
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Choosing what to eat or listen to can be frustrating when you're not
          sure what matches your mood or energy. SmartMoodify takes away the
          decision fatigue by making emotionally and contextually relevant
          suggestions—no endless scrolling or second-guessing.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant='h4' gutterBottom>
          How It Works
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
          1. You describe how you're feeling in natural language and list
          available ingredients.
          <br />
          2. The app detects your mood using Hugging Face's emotion
          classification model.
          <br />
          3. Weather data is automatically fetched based on your location.
          <br />
          4. Spoonacular suggests recipes using your ingredients.
          <br />
          5. Hugging Face scores those recipes for emotional relevance.
          <br />
          6. Spotify recommends music that matches your vibe.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant='h4' gutterBottom>
          APIs and Tools Used
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Psychology sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant='h6'>Hugging Face</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Used for detecting emotion from user input and classifying
                  recipe "vibes".
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Restaurant sx={{ fontSize: 40, color: 'secondary.main' }} />
                <Typography variant='h6'>Spoonacular</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Used to fetch recipes based on provided ingredients.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <MusicNote sx={{ fontSize: 40, color: 'success.main' }} />
                <Typography variant='h6'>Spotify</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Used for mood-aligned music recommendations and previews.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Cloud sx={{ fontSize: 40, color: 'info.main' }} />
                <Typography variant='h6'>OpenWeatherMap</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Retrieves real-time weather to tailor suggestions based on
                  climate.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant='h4' gutterBottom>
          Creators
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar alt='Dhruva Navada' src='/profile.jpg' />
          <Box>
            <Typography variant='body1'>Dhruva Navada</Typography>
            <Link
              href='https://github.com/DhruvaNavada'
              target='_blank'
              rel='noopener'
            >
              GitHub
            </Link>
            {' | '}
            <Link
              href='https://linkedin.com/in/dhruvanavada'
              target='_blank'
              rel='noopener'
            >
              LinkedIn
            </Link>
          </Box>
        </Box>
        <br />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar alt='Dhruva Navada' src='/profile.jpg' />
          <Box>
            <Typography variant='body1'>Shriya Arunkumar</Typography>
            <Link
              href='https://github.com/ShriyaArunkumar'
              target='_blank'
              rel='noopener'
            >
              GitHub
            </Link>
            {' | '}
            <Link
              href='https://linkedin.com/in/shriyaarunkumar'
              target='_blank'
              rel='noopener'
            >
              LinkedIn
            </Link>
          </Box>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant='h6' color='text.secondary'>
          Built with ❤️ using open source APIs:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
          <img src='/logos/huggingface.png' alt='Hugging Face' height='30' />
          <img src='/logos/spoonacular.png' alt='Spoonacular' height='30' />
          <img src='/logos/spotify.png' alt='Spotify' height='30' />
          <img src='/logos/openweather.png' alt='OpenWeather' height='30' />
        </Box>
      </Box>
    </Container>
  );
};

export default About;

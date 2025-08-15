import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  FormGroup,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  MusicNote as MusicIcon,
  Restaurant as RestaurantIcon,
  LocalDining as DiningIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@mui/icons-material';
import { useThemeMode } from '../theme/ThemeContext';
import { usePreference } from '../components/PreferenceContext';
import {
  AnimatedBox,
  AnimatedCard,
  FloatingIcon,
  StaggeredList,
  StaggeredListItem,
  PulseButton,
} from '../components/MotionComponents';

const Settings = () => {
  const { mode, toggleTheme } = useThemeMode();
  const {
    musicGenres,
    setMusicGenres,
    cuisines,
    setCuisines,
    dietaryPrefs,
    setDietaryPrefs,
  } = usePreference();
  const [useSpeech, setUseSpeech] = React.useState(false);
  const [autoMood, setAutoMood] = React.useState(true);

  const musicGenreOptions = [
    'Pop',
    'Rock',
    'Hip Hop',
    'Jazz',
    'Classical',
    'Electronic',
    'Country',
    'R&B',
    'Blues',
    'Folk',
  ];

  const cuisineOptions = [
    'Italian',
    'Mexican',
    'Chinese',
    'Indian',
    'Japanese',
    'Thai',
    'French',
    'Mediterranean',
    'American',
    'Greek',
  ];

  return (
    <Container maxWidth='md' sx={{ py: 6 }}>
      <AnimatedBox>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <FloatingIcon>
            <SettingsIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          </FloatingIcon>
          <Typography
            variant='h2'
            component='h1'
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              textShadow: (theme) => 
                theme.palette.mode === 'light' 
                  ? '0 2px 4px rgba(0,0,0,0.1)' 
                  : '0 2px 4px rgba(255,255,255,0.1)',
            }}
          >
            Settings
          </Typography>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Customize your MoodPlate experience
          </Typography>
        </Box>
      </AnimatedBox>

      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <StaggeredList>
          <Box sx={{ mb: 3 }}>
            <AnimatedCard delay={0}>
              <Paper sx={{ p: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <PaletteIcon
                  sx={{ mr: 2, color: 'primary.main', fontSize: 32 }}
                />
                <Typography
                  variant='h4'
                  component='h2'
                  sx={{ fontWeight: 600 }}
                >
                  Appearance
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {mode === 'light' ? (
                    <LightIcon sx={{ mr: 2, color: 'warning.main' }} />
                  ) : (
                    <DarkIcon sx={{ mr: 2, color: 'primary.main' }} />
                  )}
                  <Box>
                    <Typography variant='h6' sx={{ fontWeight: 600 }}>
                      {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {mode === 'dark'
                        ? 'Currently using dark theme'
                        : 'Currently using light theme'}
                    </Typography>
                  </Box>
                </Box>
                <PulseButton>
                  <Switch
                    checked={mode === 'dark'}
                    onChange={toggleTheme}
                    color='primary'
                    size='large'
                  />
                </PulseButton>
              </Box>
              </Paper>
            </AnimatedCard>
          </Box>

          <Box sx={{ mb: 3 }}>
            <AnimatedCard delay={1}>
              <Paper sx={{ p: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <DiningIcon
                  sx={{ mr: 2, color: 'secondary.main', fontSize: 32 }}
                />
                <Typography
                  variant='h4'
                  component='h2'
                  sx={{ fontWeight: 600 }}
                >
                  Dietary Preferences
                </Typography>
              </Box>
              <FormGroup
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dietaryPrefs.vegetarian}
                      onChange={(e) =>
                        setDietaryPrefs({
                          ...dietaryPrefs,
                          vegetarian: e.target.checked,
                        })
                      }
                      color='primary'
                    />
                  }
                  label={
                    <Box>
                      <Typography variant='body1' sx={{ fontWeight: 600 }}>
                        Vegetarian
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        Plant-based meals only
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dietaryPrefs.vegan}
                      onChange={(e) =>
                        setDietaryPrefs({
                          ...dietaryPrefs,
                          vegan: e.target.checked,
                        })
                      }
                      color='primary'
                    />
                  }
                  label={
                    <Box>
                      <Typography variant='body1' sx={{ fontWeight: 600 }}>
                        Vegan
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        No animal products
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dietaryPrefs.glutenFree}
                      onChange={(e) =>
                        setDietaryPrefs({
                          ...dietaryPrefs,
                          glutenFree: e.target.checked,
                        })
                      }
                      color='primary'
                    />
                  }
                  label={
                    <Box>
                      <Typography variant='body1' sx={{ fontWeight: 600 }}>
                        Gluten Free
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        No gluten ingredients
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dietaryPrefs.dairyFree}
                      onChange={(e) =>
                        setDietaryPrefs({
                          ...dietaryPrefs,
                          dairyFree: e.target.checked,
                        })
                      }
                      color='primary'
                    />
                  }
                  label={
                    <Box>
                      <Typography variant='body1' sx={{ fontWeight: 600 }}>
                        Dairy Free
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        No dairy products
                      </Typography>
                    </Box>
                  }
                />
              </FormGroup>
                </Paper>
              </AnimatedCard>
            </Box>

            <Box sx={{ mb: 3 }}>
              <AnimatedCard delay={2}>
              <Paper sx={{ p: 5}}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <RestaurantIcon
                  sx={{ mr: 2, color: 'info.main', fontSize: 32 }}
                />
                <Typography
                  variant='h4'
                  component='h2'
                  sx={{ fontWeight: 600 }}
                >
                  Cuisine Preferences
                </Typography>
              </Box>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel 
                  sx={{ 
                    backgroundColor: 'background.paper',
                    px: 1,
                    zIndex: 1
                  }}
                >
                  Cuisine Types
                </InputLabel>
                <Select
                  multiple
                  value={cuisines}
                  onChange={(e) => setCuisines(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      zIndex: 0
                    }
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          size='small'
                          color='primary'
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      sx: { maxHeight: 300 },
                    },
                  }}
                >
                  {cuisineOptions.map((cuisine) => (
                    <MenuItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant='body2' color='text.secondary'>
                Select your preferred cuisine types for recipe recommendations
              </Typography>
                </Paper>
              </AnimatedCard>
            </Box>

            <Box sx={{ mb: 3 }}>
              <AnimatedCard delay={3}>
              <Paper sx={{ p: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <MusicIcon
                  sx={{ mr: 2, color: 'success.main', fontSize: 32 }}
                />
                <Typography
                  variant='h4'
                  component='h2'
                  sx={{ fontWeight: 600 }}
                >
                  Music Preferences
                </Typography>
              </Box>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel 
                  sx={{ 
                    backgroundColor: 'background.paper',
                    px: 1,
                    zIndex: 1
                  }}
                >
                  Music Genres
                </InputLabel>
                <Select
                  multiple
                  value={musicGenres}
                  onChange={(e) => setMusicGenres(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      zIndex: 0
                    }
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          size='small'
                          color='secondary'
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      sx: { maxHeight: 300 },
                    },
                  }}
                >
                  {musicGenreOptions.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant='body2' color='text.secondary'>
                Choose your favorite music genres for personalized
                recommendations
              </Typography>
              </Paper>
            </AnimatedCard>
          </Box>
        </StaggeredList>
      </Box>
    </Container>
  );
};

export default Settings;

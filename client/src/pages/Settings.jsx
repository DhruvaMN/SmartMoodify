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
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { useThemeMode } from '../theme/ThemeContext';
import { usePreference } from '../components/PreferenceContext';

const Settings = () => {
  const { mode, toggleTheme } = useThemeMode();

  const {musicGenres, setMusicGenres, cuisines, setCuisines, dietaryPrefs, setDietaryPrefs} = usePreference()
  const [useSpeech, setUseSpeech] = React.useState(false);
  const [autoMood, setAutoMood] = React.useState(true);

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h3' component='h1' gutterBottom>
          <SettingsIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Settings
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          Customize your SmartMoodify experience
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            Appearance
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                color='primary'
              />
            }
            label={`Dark Mode ${mode === 'dark' ? '(On)' : '(Off)'}`}
          />
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            Toggle between light and dark themes
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            Preferences
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant='subtitle1'>Dietary Preferences</Typography>
            <FormGroup row>
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
                  />
                }
                label='Vegetarian'
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
                  />
                }
                label='Vegan'
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
                  />
                }
                label='Gluten-Free'
              />
            </FormGroup>
          </Box>

          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Favorite Cuisines</InputLabel>
              <Select
                multiple
                value={cuisines}
                onChange={(e) => setCuisines(e.target.value)}
                label='Favorite Cuisines'
              >
                {[
                  'Indian',
                  'Italian',
                  'Mexican',
                  'Chinese',
                  'Thai',
                  'Mediterranean',
                ].map((cuisine) => (
                  <MenuItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Preferred Music Genres</InputLabel>
              <Select
                multiple
                value={musicGenres}
                onChange={(e) => setMusicGenres(e.target.value)}
                label='Preferred Music Genres'
              >
                {[
                  'Lo-fi',
                  'Jazz',
                  'EDM',
                  'Acoustic',
                  'Classical',
                  'Pop',
                  'Rock',
                ].map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={useSpeech}
                  onChange={(e) => setUseSpeech(e.target.checked)}
                />
              }
              label={`Speech Input ${useSpeech ? '(On)' : '(Off)'}`}
            />
          </Box>

          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={autoMood}
                  onChange={(e) => setAutoMood(e.target.checked)}
                />
              }
              label={`Auto Mood Detection ${autoMood ? '(On)' : '(Off)'}`}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Settings;

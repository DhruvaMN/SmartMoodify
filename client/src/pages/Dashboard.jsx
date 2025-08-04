import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CardActionArea,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Restaurant as RestaurantIcon,
  MusicNote as MusicIcon
} from '@mui/icons-material';
import { usePreference } from '../components/PreferenceContext';

const Dashboard = () => {
  const {musicGenres, setMusicGenres, cuisines, setCuisines, dietaryPrefs, setDietaryPrefs} = usePreference()
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [moodText, setMoodText] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Convert dietary preferences object to string for API
      const activeDietaryPrefs = Object.keys(dietaryPrefs)
        .filter(key => dietaryPrefs[key])
        .map(key => {
          // Convert camelCase to API format
          if (key === 'glutenFree') return 'gluten free';
          return key;
        });
      
      const response = await axios.post(
        'http://localhost:3050/api/recommendations',
        {
          moodText,
          ingredients,
          musicGenres,
          cuisines,
          dietaryPrefs: activeDietaryPrefs,
          // Send individual preferences for server compatibility
          dietaryPreference: activeDietaryPrefs.length > 0 ? activeDietaryPrefs[0] : '',
          cuisinePreference: cuisines.length > 0 ? cuisines[0] : '',
        }
      );
      setRecommendation(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h3' component='h1' gutterBottom>
          <DashboardIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Dashboard
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          Enter your mood and ingredients to get personalized meal and music
          recommendations.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          label='How are you feeling today?'
          variant='outlined'
          fullWidth
          margin='normal'
          value={moodText}
          onChange={(e) => setMoodText(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          label='Add an ingredient'
          variant='outlined'
          fullWidth
          margin='normal'
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
        />
        <Box sx={{ mt: 1, textAlign: 'right' }}>
          <Button variant='contained' onClick={handleAddIngredient}>
            Add Ingredient
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant='subtitle1'>Ingredients List:</Typography>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Box>
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={handleSubmit}
          disabled={loading || !moodText.trim() || ingredients.length === 0}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Getting Recommendations...' : 'Get My Recommendations'}
        </Button>
      </Box>

      {loading && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Finding the perfect recommendations for your mood...
          </Typography>
        </Box>
      )}

      {recommendation && !loading && (
        <Box sx={{ mt: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Chip 
              label={`Mood Detected: ${recommendation.mood}`} 
              color="primary" 
              size="large"
              sx={{ 
                fontSize: '1.1rem', 
                py: 2, 
                px: 1,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
              }}
            />
          </Box>

          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <RestaurantIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant='h5' component='h2'>
                Recipe Recommendations
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {recommendation.recipes.map((recipe, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                        '& .recipe-image': {
                          transform: 'scale(1.05)'
                        }
                      }
                    }}
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    <Box sx={{ overflow: 'hidden', height: 200 }}>
                      <CardMedia
                        className="recipe-image"
                        component='img'
                        height='200'
                        image={recipe.image}
                        alt={recipe.title}
                        sx={{
                          transition: 'transform 0.3s ease-in-out',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
                        {recipe.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                        {recipe.summary?.replace(/<[^>]+>/g, '').slice(0, 120)}...
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                          label="View Recipe" 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                        {recipe.readyInMinutes && (
                          <Typography variant="caption" color="text.secondary">
                            {recipe.readyInMinutes} min
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <MusicIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant='h5' component='h2'>
                Music Recommendations
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {recommendation.music.map((track, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                        '& .music-image': {
                          transform: 'scale(1.03)'
                        }
                      }
                    }}
                  >
                    <Box sx={{ overflow: 'hidden', height: 200 }}>
                      <CardMedia
                        className="music-image"
                        component='img'
                        height='200'
                        image={track.image}
                        alt={track.name}
                        sx={{
                          transition: 'transform 0.3s ease-in-out',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
                        {track.name}
                      </Typography>
                      <Typography variant='subtitle2' color='text.secondary' sx={{ mb: 2 }}>
                        by {track.artist}
                      </Typography>
                      {track.preview_url && (
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<PlayIcon />}
                          href={track.preview_url}
                          target='_blank'
                          rel='noopener'
                          sx={{
                            background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #FF5252 30%, #26A69A 90%)'
                            }
                          }}
                        >
                          Preview
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      {/* Recipe Details Modal */}
      <Dialog 
        open={modalOpen} 
        onClose={handleCloseModal} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh'
          }
        }}
      >
        {selectedRecipe && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, pr: 2 }}>
                  {selectedRecipe.title}
                </Typography>
                <IconButton onClick={handleCloseModal} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <img 
                  src={selectedRecipe.image} 
                  alt={selectedRecipe.title}
                  style={{ 
                    width: '100%', 
                    height: '300px', 
                    objectFit: 'cover', 
                    borderRadius: '8px' 
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Summary
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedRecipe.summary?.replace(/<[^>]+>/g, '') || 'No summary available.'}
                </Typography>
              </Box>

              {selectedRecipe.readyInMinutes && (
                <Box sx={{ mb: 3 }}>
                  <Chip 
                    label={`Ready in ${selectedRecipe.readyInMinutes} minutes`} 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
              )}

              {selectedRecipe.extendedIngredients && selectedRecipe.extendedIngredients.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Ingredients
                  </Typography>
                  <List dense>
                    {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText 
                          primary={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {selectedRecipe.instructions && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Instructions
                  </Typography>
                  <Typography variant="body2">
                    {selectedRecipe.instructions.replace(/<[^>]+>/g, '')}
                  </Typography>
                </Box>
              )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={handleCloseModal} variant="outlined">
                Close
              </Button>
              {selectedRecipe.sourceUrl && (
                <Button 
                  href={selectedRecipe.sourceUrl} 
                  target="_blank" 
                  rel="noopener"
                  variant="contained"
                >
                  View Full Recipe
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Dashboard;

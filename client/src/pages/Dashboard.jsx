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
  Paper,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Restaurant as RestaurantIcon,
  MusicNote as MusicIcon,
  Add as AddIcon,
  EmojiEmotions as EmojiIcon,
  LocalDining as DiningIcon,
} from '@mui/icons-material';
import { usePreference } from '../components/PreferenceContext';
import {
  AnimatedBox,
  AnimatedCard,
  AnimatedGridItem,
  LoadingAnimation,
  PulseButton,
  FloatingIcon,
  StaggeredList,
  StaggeredListItem,
} from '../components/MotionComponents';

const Dashboard = () => {
  const {
    musicGenres,
    setMusicGenres,
    cuisines,
    setCuisines,
    dietaryPrefs,
    setDietaryPrefs,
  } = usePreference();
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
        .filter((key) => dietaryPrefs[key])
        .map((key) => {
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
          dietaryPreference:
            activeDietaryPrefs.length > 0 ? activeDietaryPrefs[0] : '',
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
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <AnimatedBox>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <FloatingIcon>
            <DashboardIcon
              sx={{ fontSize: 60, color: 'primary.main', mb: 2 }}
            />
          </FloatingIcon>
          <Typography
            variant='h2'
            component='h1'
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            Dashboard
          </Typography>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Enter your mood and ingredients to get personalized meal and music
            recommendations.
          </Typography>
        </Box>
      </AnimatedBox>

      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <StaggeredList>
          <Box sx={{ mb: 3 }}>
            <AnimatedCard delay={0}>
              <Paper sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <EmojiIcon
                    sx={{ mr: 2, color: 'primary.main', fontSize: 28 }}
                  />
                  <Typography
                    variant='h5'
                    component='h2'
                    sx={{ fontWeight: 600 }}
                  >
                    How are you feeling today?
                  </Typography>
                </Box>
                <TextField
                  label='Describe your mood...'
                  variant='outlined'
                  fullWidth
                  multiline
                  rows={3}
                  value={moodText}
                  onChange={(e) => setMoodText(e.target.value)}
                  placeholder="I'm feeling happy and energetic today..."
                  sx={{ mb: 3 }}
                />
              </Paper>
            </AnimatedCard>
          </Box>

          <Box sx={{ mb: 6 }}>
            <AnimatedCard delay={1}>
              <Paper sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <DiningIcon
                    sx={{ mr: 2, color: 'secondary.main', fontSize: 28 }}
                  />
                  <Typography
                    variant='h5'
                    component='h2'
                    sx={{ fontWeight: 600 }}
                  >
                    Available Ingredients
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <TextField
                    label='Add an ingredient'
                    variant='outlined'
                    fullWidth
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    placeholder='e.g., chicken, rice, tomatoes...'
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleAddIngredient()
                    }
                  />
                  <PulseButton>
                    <Button
                      variant='contained'
                      onClick={handleAddIngredient}
                      startIcon={<AddIcon />}
                      sx={{ minWidth: 140 }}
                    >
                      Add
                    </Button>
                  </PulseButton>
                </Box>

                {ingredients.length > 0 && (
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      Your Ingredients:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {ingredients.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          color='primary'
                          variant='outlined'
                          onDelete={() =>
                            setIngredients(
                              ingredients.filter((_, i) => i !== index)
                            )
                          }
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Paper>
            </AnimatedCard>
          </Box>

          <AnimatedBox>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <PulseButton>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  onClick={handleSubmit}
                  disabled={
                    loading || !moodText.trim() || ingredients.length === 0
                  }
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color='inherit' />
                    ) : null
                  }
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                  }}
                >
                  {loading
                    ? 'Getting Recommendations...'
                    : 'Get My Recommendations'}
                </Button>
              </PulseButton>
            </Box>
          </AnimatedBox>
        </StaggeredList>
      </Box>

      {loading && (
        <LoadingAnimation>
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <CircularProgress size={80} sx={{ color: 'primary.main' }} />
            <Typography variant='h6' sx={{ mt: 3, color: 'text.secondary' }}>
              Finding the perfect recommendations for your mood (takes about a minute)...
            </Typography>
          </Box>
        </LoadingAnimation>
      )}

      {recommendation && !loading && (
        <AnimatedBox>
          <Box sx={{ mt: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box sx={{ mb: 6 }}>
                <AnimatedBox>
                  <Chip
                    label={`Here are some ${recommendation.mood.toUpperCase()} recipes for you`}
                    color='primary'
                    size='large'
                    sx={{
                      fontSize: '1.2rem',
                      py: 3,
                      px: 3,
                      background:
                        'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </AnimatedBox>
              </Box>
            </Box>

            {recommendation.recipes.length === 0 ? (
              <Box sx={{ textAlign: 'center', my: 6 }}>
                <Typography variant='h6' color='text.secondary' gutterBottom>
                  No recipes found.
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Try again with fewer or different ingredients.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <FloatingIcon>
                    <RestaurantIcon
                      sx={{ mr: 2, color: 'primary.main', fontSize: 32 }}
                    />
                  </FloatingIcon>
                  <Typography
                    variant='h4'
                    component='h2'
                    sx={{ fontWeight: 600 }}
                  >
                    Recipe Recommendations
                  </Typography>
                </Box>
                <Grid container spacing={3} justifyContent='center'>
                  {recommendation.recipes.map((recipe, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={index}
                      maxWidth={900}
                      width='100%'
                    >
                      <AnimatedGridItem index={index}>
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                              '& .recipe-image': {
                                transform: 'scale(1.05)',
                              },
                            },
                          }}
                          onClick={() => handleRecipeClick(recipe)}
                        >
                          <Box sx={{ overflow: 'hidden', height: 200 }}>
                            <CardMedia
                              className='recipe-image'
                              component='img'
                              height='200'
                              image={recipe.image}
                              alt={recipe.title}
                              sx={{
                                transition:
                                  'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                objectFit: 'cover',
                              }}
                            />
                          </Box>
                          <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Typography
                              variant='h6'
                              gutterBottom
                              sx={{ fontWeight: 600, mb: 2 }}
                            >
                              {recipe.title}
                            </Typography>
                            <Typography
                              variant='body2'
                              color='text.secondary'
                              sx={{ mb: 3, lineHeight: 1.6 }}
                            >
                              {recipe.summary
                                ?.replace(/<[^>]+>/g, '')
                                .slice(0, 120)}
                              ...
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Chip
                                label='View Recipe'
                                size='small'
                                color='primary'
                                variant='outlined'
                                sx={{ fontWeight: 500 }}
                              />
                              {recipe.readyInMinutes && (
                                <Typography
                                  variant='caption'
                                  color='text.secondary'
                                  sx={{ fontWeight: 500 }}
                                >
                                  ⏱️ {recipe.readyInMinutes} min
                                </Typography>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      </AnimatedGridItem>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Divider sx={{ my: 6 }} />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <FloatingIcon delay={1}>
                  <MusicIcon
                    sx={{ mr: 2, color: 'secondary.main', fontSize: 32 }}
                  />
                </FloatingIcon>
                <Typography
                  variant='h4'
                  component='h2'
                  sx={{ fontWeight: 600 }}
                >
                  Music Recommendations
                </Typography>
              </Box>
              <Grid container spacing={3} justifyContent='center'>
                {recommendation.music.map((track, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    maxWidth={350}
                    width='100%'
                  >
                    <AnimatedGridItem index={index}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
                            '& .music-image': {
                              transform: 'scale(1.03)',
                            },
                          },
                        }}
                      >
                        <Box sx={{ overflow: 'hidden', height: 200 }}>
                          <CardMedia
                            className='music-image'
                            component='img'
                            height='200'
                            image={track.image}
                            alt={track.name}
                            sx={{
                              transition:
                                'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography
                            variant='h6'
                            gutterBottom
                            sx={{ fontWeight: 600, mb: 2 }}
                          >
                            {track.name}
                          </Typography>
                          <Typography
                            variant='subtitle2'
                            color='text.secondary'
                            sx={{ mb: 3 }}
                          >
                            by {track.artist}
                          </Typography>
                          {track.preview_url && (
                            <PulseButton>
                              <Button
                                variant='contained'
                                size='small'
                                startIcon={<PlayIcon />}
                                href={track.preview_url}
                                target='_blank'
                                rel='noopener noreferrer'
                                fullWidth
                                sx={{ borderRadius: 2 }}
                              >
                                Preview
                              </Button>
                            </PulseButton>
                          )}
                        </CardContent>
                      </Card>
                    </AnimatedGridItem>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </AnimatedBox>
      )}

      {/* Recipe Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth='md'
        fullWidth
        sx={{ borderRadius: 3 }}
      >
        {selectedRecipe && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h5' sx={{ fontWeight: 600 }}>
                  {selectedRecipe.title}
                </Typography>
                <IconButton onClick={handleCloseModal}>
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
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                />
              </Box>
              <Typography variant='body1' sx={{ mb: 3, lineHeight: 1.6 }}>
                {selectedRecipe.summary?.replace(/<[^>]+>/g, '')}
              </Typography>
              {selectedRecipe.instructions && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant='h6'
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Instructions:
                  </Typography>
                  <Typography variant='body2' sx={{ lineHeight: 1.6 }}>
                    {selectedRecipe.instructions}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseModal} color='primary'>
                Close
              </Button>
              {selectedRecipe.sourceUrl && (
                <Button
                  variant='contained'
                  href={selectedRecipe.sourceUrl}
                  target='_blank'
                  rel='noopener noreferrer'
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

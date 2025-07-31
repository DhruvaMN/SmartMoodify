import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Button, 
  Chip,
  IconButton 
} from '@mui/material';
import { 
  MusicNote, 
  Restaurant, 
  OpenInNew, 
  Favorite, 
  FavoriteBorder 
} from '@mui/icons-material';

const ResultCard = ({ type, data, onFavorite, isFavorited = false }) => {
  const isMusicCard = type === 'music';
  const isMealCard = type === 'meal';

  const renderMusicCard = () => (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <MusicNote sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" component="h3">
          Music Suggestion
        </Typography>
        <IconButton 
          onClick={() => onFavorite?.(data)} 
          sx={{ ml: 'auto' }}
          color="secondary"
        >
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>
      
      {data.image && (
        <CardMedia
          component="img"
          height="200"
          image={data.image}
          alt={data.songName}
          sx={{ borderRadius: 1, mb: 2 }}
        />
      )}
      
      <Typography variant="h5" component="h4" gutterBottom>
        {data.songName}
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        by {data.artist}
      </Typography>
      
      {data.album && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Album: {data.album}
        </Typography>
      )}
      
      {data.genre && (
        <Box sx={{ mb: 2 }}>
          <Chip label={data.genre} size="small" color="primary" variant="outlined" />
        </Box>
      )}
      
      {data.spotifyLink && (
        <Button
          variant="contained"
          startIcon={<OpenInNew />}
          href={data.spotifyLink}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          sx={{ mt: 2 }}
        >
          Listen on Spotify
        </Button>
      )}
    </>
  );

  const renderMealCard = () => (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Restaurant sx={{ color: 'secondary.main', mr: 1 }} />
        <Typography variant="h6" component="h3">
          Meal Suggestion
        </Typography>
        <IconButton 
          onClick={() => onFavorite?.(data)} 
          sx={{ ml: 'auto' }}
          color="secondary"
        >
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>
      
      {data.image && (
        <CardMedia
          component="img"
          height="200"
          image={data.image}
          alt={data.recipeName}
          sx={{ borderRadius: 1, mb: 2 }}
        />
      )}
      
      <Typography variant="h5" component="h4" gutterBottom>
        {data.recipeName}
      </Typography>
      
      {data.description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {data.description}
        </Typography>
      )}
      
      {data.ingredients && data.ingredients.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Ingredients:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {data.ingredients.slice(0, 6).map((ingredient, index) => (
              <Chip 
                key={index} 
                label={ingredient} 
                size="small" 
                variant="outlined"
                color="secondary"
              />
            ))}
            {data.ingredients.length > 6 && (
              <Chip 
                label={`+${data.ingredients.length - 6} more`} 
                size="small" 
                variant="outlined"
              />
            )}
          </Box>
        </Box>
      )}
      
      {data.cookingTime && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ⏱️ Cooking time: {data.cookingTime}
        </Typography>
      )}
      
      {data.difficulty && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          📊 Difficulty: {data.difficulty}
        </Typography>
      )}
      
      {data.recipeLink && (
        <Button
          variant="contained"
          startIcon={<OpenInNew />}
          href={data.recipeLink}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          sx={{ mt: 2 }}
        >
          View Full Recipe
        </Button>
      )}
    </>
  );

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {isMusicCard && renderMusicCard()}
        {isMealCard && renderMealCard()}
      </CardContent>
    </Card>
  );
};

export default ResultCard;

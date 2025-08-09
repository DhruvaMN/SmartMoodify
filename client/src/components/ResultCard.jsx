import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import {
  MusicNote,
  Restaurant,
  OpenInNew,
  Favorite,
  FavoriteBorder,
  PlayArrow,
  Timer,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ResultCard = ({ type, data, onFavorite, isFavorited = false }) => {
  const isMusicCard = type === 'music';
  const isMealCard = type === 'meal';

  const renderMusicCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MusicNote sx={{ color: 'primary.main', mr: 1, fontSize: 24 }} />
        <Typography variant='h6' component='h3' sx={{ fontWeight: 600 }}>
          Music Suggestion
        </Typography>
        <IconButton
          onClick={() => onFavorite?.(data)}
          sx={{ ml: 'auto' }}
          color='secondary'
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      {data.image && (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <CardMedia
            component='img'
            height='200'
            image={data.image}
            alt={data.songName}
            sx={{
              borderRadius: 2,
              mb: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          />
        </motion.div>
      )}

      <Typography
        variant='h5'
        component='h4'
        gutterBottom
        sx={{ fontWeight: 700, mb: 1 }}
      >
        {data.songName}
      </Typography>

      <Typography
        variant='subtitle1'
        color='text.secondary'
        gutterBottom
        sx={{ mb: 2, fontWeight: 500 }}
      >
        by {data.artist}
      </Typography>

      {data.album && (
        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
          Album: {data.album}
        </Typography>
      )}

      {data.genre && (
        <Box sx={{ mb: 3 }}>
          <Chip
            label={data.genre}
            size='small'
            color='primary'
            variant='outlined'
            sx={{ fontWeight: 500 }}
          />
        </Box>
      )}

      {data.spotifyLink && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant='contained'
            startIcon={<PlayArrow />}
            href={data.spotifyLink}
            target='_blank'
            rel='noopener noreferrer'
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Listen on Spotify
          </Button>
        </motion.div>
      )}
    </motion.div>
  );

  const renderMealCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Restaurant sx={{ color: 'secondary.main', mr: 1, fontSize: 24 }} />
        <Typography variant='h6' component='h3' sx={{ fontWeight: 600 }}>
          Meal Suggestion
        </Typography>
        <IconButton
          onClick={() => onFavorite?.(data)}
          sx={{ ml: 'auto' }}
          color='secondary'
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      {data.image && (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <CardMedia
            component='img'
            height='200'
            image={data.image}
            alt={data.recipeName}
            sx={{
              borderRadius: 2,
              mb: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          />
        </motion.div>
      )}

      <Typography
        variant='h5'
        component='h4'
        gutterBottom
        sx={{ fontWeight: 700, mb: 2 }}
      >
        {data.recipeName}
      </Typography>

      {data.description && (
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mb: 3, lineHeight: 1.6 }}
        >
          {data.description}
        </Typography>
      )}

      {data.ingredients && data.ingredients.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant='subtitle2'
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            Ingredients:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {data.ingredients.slice(0, 6).map((ingredient, index) => (
              <Chip
                key={index}
                label={ingredient}
                size='small'
                variant='outlined'
                color='secondary'
                sx={{ fontWeight: 500 }}
              />
            ))}
            {data.ingredients.length > 6 && (
              <Chip
                label={`+${data.ingredients.length - 6} more`}
                size='small'
                variant='outlined'
                sx={{ fontWeight: 500 }}
              />
            )}
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {data.cookingTime && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Timer sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontWeight: 500 }}
            >
              {data.cookingTime}
            </Typography>
          </Box>
        )}

        {data.difficulty && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontWeight: 500 }}
            >
              {data.difficulty}
            </Typography>
          </Box>
        )}
      </Box>

      {data.recipeLink && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant='contained'
            startIcon={<OpenInNew />}
            href={data.recipeLink}
            target='_blank'
            rel='noopener noreferrer'
            fullWidth
            sx={{
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            View Full Recipe
          </Button>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 20px 40px rgba(0,0,0,0.15)'
                : '0 20px 40px rgba(0,0,0,0.4)',
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {isMusicCard && renderMusicCard()}
          {isMealCard && renderMealCard()}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultCard;

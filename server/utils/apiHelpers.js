const axios = require('axios');
require('dotenv').config();

// 1. Get emotion from user text using Hugging Face zero-shot classifier
async function getEmotion(text) {
  const labels = [
    'happy',
    'sad',
    'tired',
    'angry',
    'anxious',
    'excited',
    'calm',
    'stressed',
    'bored',
  ];
  const response = await axios.post(
    'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
    {
      inputs: text,
      parameters: { candidate_labels: labels },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
    }
  );

  const topLabel = response.data?.labels[0];

  const moodMap = {
    happy: 'refreshing',
    sad: 'comforting',
    tired: 'hearty',
    angry: 'bold',
    anxious: 'light',
    excited: 'energizing',
    calm: 'soothing',
    stressed: 'grounding',
    bored: 'novel',
  };
  console.log('emotions working: ', response.data.labels[0])

  return moodMap[topLabel] || 'comforting';
}

// 3. Get recipes from Spoonacular
async function getRecipes(ingredients) {
  const response = await axios.get(
    'https://api.spoonacular.com/recipes/complexSearch',
    {
      params: {
        includeIngredients: ingredients.join(','),
        instructionsRequired: true,
        addRecipeInformation: true,
        number: 10,
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    }
  );
  // console.log('recipes working: ', response.data.results)
  return response.data.results;
}

// 4. Classify recipes using Hugging Face
async function classifyRecipes(recipes, moodLabel) {
  const scored = await Promise.all(
    recipes.map(async (recipe) => {
      const res = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
        {
          inputs: recipe.summary || recipe.title,
          parameters: {
            candidate_labels: [
              'comforting',
              'energizing',
              'light',
              'refreshing',
              'hearty',
              'bold',
              'soothing',
              'grounding',
              'novel',
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          },
        }
      );
      console.log('classification working')

      const index = res.data.labels.indexOf(moodLabel);
      const score = res.data.scores[index] || 0;

      return { ...recipe, moodScore: score };
    })
  );
  return scored.sort((a, b) => b.moodScore - a.moodScore).slice(0, 3);
}

// 5. Get music tracks from Spotify
async function getMusic(mood) {
  const tokenRes = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const token = tokenRes.data.access_token;

  const keywordMap = {
    comforting: 'lofi',
    energizing: 'upbeat',
    light: 'acoustic',
    refreshing: 'chill',
    hearty: 'jazz',
    bold: 'rap',
    soothing: 'ambient',
    grounding: 'hip-hop',
    novel: 'electronic',
  };

  const searchTerm = keywordMap[mood] || 'ambient';

  const musicRes = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: searchTerm,
      type: 'track',
      limit: 3,
    },
  });
  console.log('music working')
  return musicRes.data.tracks.items.map((track) => ({
    name: track.name,
    artist: track.artists[0].name,
    preview_url: track.preview_url,
    image: track.album.images[0]?.url,
  }));
}

module.exports = {
  getEmotion,
  getRecipes,
  classifyRecipes,
  getMusic,
};

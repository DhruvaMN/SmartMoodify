const {
  getEmotion,
  getRecipes,
  classifyRecipes,
  getMusic,
} = require('../utils/apiHelpers');

exports.getRecommendations = async (req, res) => {
  const { moodText, ingredients, dietaryPreference, cusinePreference, cuisinePreference, musicGenres } = req.body;

  try {
    const mood = await getEmotion(moodText);
    // Use cuisinePreference if available, fallback to cusinePreference for backward compatibility
    const cuisine = cuisinePreference || cusinePreference;
    const recipes = await getRecipes(ingredients, dietaryPreference, cuisine);
    const rankedRecipes = await classifyRecipes(recipes, mood);
    const music = await getMusic(mood, musicGenres);

    res.json({ mood, recipes: rankedRecipes, music });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

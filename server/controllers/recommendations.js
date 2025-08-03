const {
  getEmotion,
  getRecipes,
  classifyRecipes,
  getMusic,
} = require('../utils/apiHelpers');

exports.getRecommendations = async (req, res) => {
  const { moodText, ingredients } = req.body;

  try {
    const mood = await getEmotion(moodText);
    const recipes = await getRecipes(ingredients);
    const rankedRecipes = await classifyRecipes(recipes, mood);
    const music = await getMusic(mood);

    res.json({ mood, recipes: rankedRecipes, music });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

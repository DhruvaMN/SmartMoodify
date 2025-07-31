import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';

const Dashboard = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
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
        <Button variant='contained' color='primary' size='large'>
          Get My Recommendations
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;

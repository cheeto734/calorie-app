# API Integration Guide

This document provides guidance on integrating real APIs for production use.

## Overview

Currently, the application uses simulated data for demonstration. To enable real functionality, you need to integrate:

1. **Vision API** (Gemini or OpenAI) - for ingredient recognition from photos
2. **USDA FoodData Central API** - for accurate nutritional data

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the project root:

```env
# Vision API (choose one)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
# OR
VITE_OPENAI_API_KEY=your_openai_api_key_here

# USDA FoodData Central
VITE_USDA_API_KEY=your_usda_api_key_here
```

### 2. Obtaining API Keys

#### Gemini Vision API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and add to `.env`

#### OpenAI Vision API
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy and add to `.env`

#### USDA FoodData Central
1. Visit [USDA FoodData Central](https://fdc.nal.usda.gov/api-key-signup.html)
2. Register for a free API key
3. Copy and add to `.env`

## Implementation Steps

### Calorie Count Page Integration

Update `src/pages/CalorieCount.jsx`:

```javascript
const analyzeImage = async () => {
  if (!selectedImage) return;
  setAnalyzing(true);

  try {
    // Step 1: Upload image to Vision API
    const formData = new FormData();
    formData.append('image', selectedImage);
    
    // Using Gemini Vision API
    const visionResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [
            { text: "Identify all food ingredients in this image and list them." },
            { inline_data: { mime_type: selectedImage.type, data: await fileToBase64(selectedImage) } }
          ]
        }]
      }
    );

    const ingredients = parseIngredientsFromResponse(visionResponse.data);

    // Step 2: Get nutritional data from USDA
    const nutritionPromises = ingredients.map(ingredient =>
      axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
        params: {
          query: ingredient,
          api_key: import.meta.env.VITE_USDA_API_KEY,
          pageSize: 1
        }
      })
    );

    const nutritionResponses = await Promise.all(nutritionPromises);
    const results = formatNutritionData(nutritionResponses);

    setResults(results);
  } catch (error) {
    console.error('Error analyzing image:', error);
    alert('Failed to analyze image. Please try again.');
  } finally {
    setAnalyzing(false);
  }
};
```

### Meal Planning Page Integration

Update `src/pages/MealPlanning.jsx`:

```javascript
const generateMealPlan = async () => {
  if (!selectedImage) return;
  setGenerating(true);

  try {
    // Step 1: Identify ingredients using Vision API
    const imageBase64 = await fileToBase64(selectedImage);
    
    const visionResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [
            { text: "List all food ingredients visible in this image." },
            { inline_data: { mime_type: selectedImage.type, data: imageBase64 } }
          ]
        }]
      }
    );

    const detectedIngredients = parseIngredientsFromResponse(visionResponse.data);

    // Step 2: Generate meal suggestions
    const mealPromptResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Generate 3 meal recipes using these ingredients: ${detectedIngredients.join(', ')}. Include recipe name, prep time, ingredients list, and step-by-step instructions.`
          }]
        }]
      }
    );

    // Step 3: Get calorie data for each meal from USDA
    const meals = parseMealsFromResponse(mealPromptResponse.data);
    // ... fetch nutrition data for each meal's ingredients

    setMealSuggestions({ detectedIngredients, meals });
  } catch (error) {
    console.error('Error generating meal plan:', error);
    alert('Failed to generate meal plan. Please try again.');
  } finally {
    setGenerating(false);
  }
};
```

## Helper Functions

Add these utility functions to a new file `src/utils/api.js`:

```javascript
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

export const parseIngredientsFromResponse = (response) => {
  // Parse the AI response to extract ingredient names
  // Implementation depends on response format
  return [];
};

export const formatNutritionData = (responses) => {
  // Format USDA API responses into app's data structure
  return {
    ingredients: [],
    totalCalories: 0
  };
};
```

## Testing

1. Add your API keys to `.env`
2. Restart the dev server: `npm run dev`
3. Upload a test image with visible food ingredients
4. Verify the responses are working correctly

## Rate Limits & Costs

- **Gemini API**: Free tier available, check current limits
- **OpenAI Vision**: Pay-per-use pricing
- **USDA FoodData Central**: Free with rate limits (1000 requests/hour)

## Security Notes

⚠️ **Important**: 
- Never commit `.env` file to version control
- Keep API keys secure
- Add `.env` to `.gitignore` (already included)
- Consider using environment-specific configs for production
- Implement proper error handling for API failures
- Add request rate limiting to prevent quota exhaustion

## Troubleshooting

### Common Issues

1. **CORS Errors**: May need to proxy API requests through your backend
2. **Rate Limiting**: Implement caching for frequently requested data
3. **Image Size**: Compress large images before sending to API
4. **API Costs**: Monitor usage to avoid unexpected charges

## Next Steps

1. Create utility functions for API calls
2. Add loading states and error handling
3. Implement caching for API responses
4. Add unit tests for API integration
5. Consider adding a backend proxy for API keys security

import { useState } from 'react';
import './MealPlanning.css';

function MealPlanning() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [mealSuggestions, setMealSuggestions] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMealSuggestions(null);
    }
  };

  const generateMealPlan = async () => {
    if (!selectedImage) return;

    setGenerating(true);
    
    // Simulate API call - In production, this would call Gemini/OpenAI Vision API
    setTimeout(() => {
      setMealSuggestions({
        detectedIngredients: ['Banana', 'Apple', 'Orange', 'Yogurt', 'Oats'],
        meals: [
          {
            name: 'Tropical Fruit Smoothie Bowl',
            calories: 320,
            prepTime: '10 mins',
            ingredients: ['Banana', 'Mango', 'Yogurt', 'Granola', 'Honey'],
            instructions: [
              'Blend banana, mango, and yogurt until smooth',
              'Pour into a bowl',
              'Top with granola and drizzle with honey',
              'Serve immediately'
            ]
          },
          {
            name: 'Apple Cinnamon Overnight Oats',
            calories: 280,
            prepTime: '5 mins + overnight',
            ingredients: ['Oats', 'Apple', 'Cinnamon', 'Almond Milk', 'Honey'],
            instructions: [
              'Mix oats with almond milk in a jar',
              'Add diced apple and cinnamon',
              'Drizzle with honey',
              'Refrigerate overnight',
              'Enjoy cold in the morning'
            ]
          },
          {
            name: 'Fresh Fruit Salad with Yogurt',
            calories: 220,
            prepTime: '8 mins',
            ingredients: ['Apple', 'Orange', 'Banana', 'Yogurt', 'Mint'],
            instructions: [
              'Dice all fruits into bite-sized pieces',
              'Mix fruits in a bowl',
              'Top with a dollop of yogurt',
              'Garnish with fresh mint leaves'
            ]
          }
        ]
      });
      setGenerating(false);
    }, 2500);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setMealSuggestions(null);
  };

  return (
    <div className="meal-planning">
      <div className="page-header">
        <h1>✨ Meal Planning</h1>
        <p>Upload ingredients and receive AI-powered meal suggestions</p>
      </div>

      <div className="upload-section">
        {!imagePreview ? (
          <div className="upload-area">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            <label htmlFor="image-upload" className="upload-label">
              <div className="upload-icon">📸</div>
              <h3>Upload Ingredients Photo</h3>
              <p>Click to select an image or drag and drop</p>
              <span className="file-types">Supports: JPG, PNG, HEIC</span>
            </label>
          </div>
        ) : (
          <div className="preview-section">
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button className="clear-button" onClick={clearImage}>✕</button>
            </div>
            {!mealSuggestions && (
              <button 
                className="generate-button" 
                onClick={generateMealPlan}
                disabled={generating}
              >
                {generating ? 'Generating Meal Ideas...' : 'Generate Meal Suggestions'}
              </button>
            )}
          </div>
        )}
      </div>

      {mealSuggestions && (
        <div className="suggestions-section">
          <div className="detected-ingredients">
            <h3>Detected Ingredients:</h3>
            <div className="ingredient-tags">
              {mealSuggestions.detectedIngredients.map((ingredient, index) => (
                <span key={index} className="ingredient-tag">{ingredient}</span>
              ))}
            </div>
          </div>

          <h2>Meal Suggestions</h2>
          <div className="meal-cards">
            {mealSuggestions.meals.map((meal, index) => (
              <div key={index} className="meal-card">
                <div className="meal-header">
                  <h3>{meal.name}</h3>
                  <div className="meal-meta">
                    <span className="calories">🔥 {meal.calories} cal</span>
                    <span className="prep-time">⏱️ {meal.prepTime}</span>
                  </div>
                </div>
                
                <div className="meal-body">
                  <div className="meal-ingredients">
                    <h4>Ingredients:</h4>
                    <ul>
                      {meal.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="meal-instructions">
                    <h4>Instructions:</h4>
                    <ol>
                      {meal.instructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="api-notice">
            <p><strong>Note:</strong> This is a demo. In production, meal suggestions are generated by:</p>
            <ul>
              <li>Gemini/OpenAI Vision API for ingredient recognition</li>
              <li>AI-powered recipe generation based on detected ingredients</li>
              <li>USDA FoodData Central for accurate calorie calculations</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealPlanning;

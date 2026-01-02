import { useState } from 'react';
import './CalorieCount.css';

function CalorieCount() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setResults(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    
    // Simulate API call - In production, this would call Gemini/OpenAI Vision + USDA API
    setTimeout(() => {
      setResults({
        ingredients: [
          { name: 'Banana', calories: 105, serving: '1 medium (118g)', protein: 1.3, carbs: 27, fat: 0.4 },
          { name: 'Apple', calories: 95, serving: '1 medium (182g)', protein: 0.5, carbs: 25, fat: 0.3 },
          { name: 'Orange', calories: 62, serving: '1 medium (131g)', protein: 1.2, carbs: 15, fat: 0.2 },
        ],
        totalCalories: 262,
      });
      setAnalyzing(false);
    }, 2000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResults(null);
  };

  return (
    <div className="calorie-count">
      <div className="page-header">
        <h1>🔍 Calorie Count</h1>
        <p>Upload a photo of your ingredients to get accurate calorie information</p>
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
              <h3>Upload Ingredient Photo</h3>
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
            {!results && (
              <button 
                className="analyze-button" 
                onClick={analyzeImage}
                disabled={analyzing}
              >
                {analyzing ? 'Analyzing...' : 'Analyze Ingredients'}
              </button>
            )}
          </div>
        )}
      </div>

      {results && (
        <div className="results-section">
          <h2>Nutrition Analysis</h2>
          <div className="total-calories">
            <span className="label">Total Calories:</span>
            <span className="value">{results.totalCalories} cal</span>
          </div>
          
          <div className="ingredients-table">
            <h3>Ingredient Breakdown</h3>
            <table>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Serving</th>
                  <th>Calories</th>
                  <th>Protein</th>
                  <th>Carbs</th>
                  <th>Fat</th>
                </tr>
              </thead>
              <tbody>
                {results.ingredients.map((ingredient, index) => (
                  <tr key={index}>
                    <td className="ingredient-name">{ingredient.name}</td>
                    <td>{ingredient.serving}</td>
                    <td className="calories">{ingredient.calories} cal</td>
                    <td>{ingredient.protein}g</td>
                    <td>{ingredient.carbs}g</td>
                    <td>{ingredient.fat}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="api-notice">
            <p><strong>Note:</strong> This is a demo. In production, results are powered by:</p>
            <ul>
              <li>Gemini/OpenAI Vision API for ingredient recognition</li>
              <li>USDA FoodData Central for accurate nutritional data</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalorieCount;

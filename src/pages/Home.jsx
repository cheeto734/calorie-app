import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to CaloriTrack</h1>
        <p className="subtitle">
          Your intelligent meal companion for tracking calories and planning nutritious meals
        </p>
        <div className="features">
          <div className="feature">
            <span className="feature-icon">📸</span>
            <h3>Photo Recognition</h3>
            <p>Upload photos of your ingredients for instant identification</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <h3>Accurate Calorie Data</h3>
            <p>Get precise calorie counts powered by USDA FoodData Central</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🍽️</span>
            <h3>Smart Meal Planning</h3>
            <p>Receive personalized meal suggestions based on your ingredients</p>
          </div>
        </div>
      </div>

      <div className="action-boxes">
        <div className="action-box" onClick={() => navigate('/calorie-count')}>
          <div className="box-icon">🔍</div>
          <h2>Calorie Count</h2>
          <p>Upload a photo of ingredients to get accurate calorie information</p>
          <button>Get Started →</button>
        </div>

        <div className="action-box" onClick={() => navigate('/meal-planning')}>
          <div className="box-icon">✨</div>
          <h2>Meal Planning</h2>
          <p>Upload ingredients and receive AI-powered meal suggestions</p>
          <button>Plan Meals →</button>
        </div>
      </div>
    </div>
  );
}

export default Home;

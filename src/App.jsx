import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CalorieCount from './pages/CalorieCount';
import MealPlanning from './pages/MealPlanning';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calorie-count" element={<CalorieCount />} />
          <Route path="/meal-planning" element={<MealPlanning />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

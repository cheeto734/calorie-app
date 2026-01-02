import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>🥗 CaloriTrack</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/calorie-count" className="nav-link">Calorie Count</Link>
          <Link to="/meal-planning" className="nav-link">Meal Planning</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

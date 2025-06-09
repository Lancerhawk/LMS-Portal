import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Laksay Academy
        </Link>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${isActiveLink('/')}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${isActiveLink('/about')}`}>
            About
          </Link>
          <Link to="/courses" className={`nav-link ${isActiveLink('/courses')}`}>
            Courses
          </Link>
          <Link to="/contact" className={`nav-link ${isActiveLink('/contact')}`}>
            Contact
          </Link>
        </div>

        <div className="navbar-buttons">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <Link to="/login" className="get-started-btn">
            Get Started
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
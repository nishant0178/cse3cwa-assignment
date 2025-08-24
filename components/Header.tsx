import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // For hamburger menu

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <header style={{ background: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000', padding: '1rem' }}>
      <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span>Student Number: 21973913</span>
        </div>

        {/* Hamburger/Kabab Menu */}
        <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
          <FaBars size={24} />
        </div>

        {/* Theme Toggle */}
        <div onClick={toggleDarkMode} style={{ cursor: 'pointer' }}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </div>
      </div>

      {/* Menu */}
      {menuOpen && (
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
                <li><a href="/tabs">Tabs</a></li> {/* Link to the Tabs Page */}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

import { Link, useLocation } from 'react-router-dom';

function Header({ theme, toggleTheme }) {
  const location = useLocation(); // Отримуємо поточний URL для активного посилання

  return (
    <header>
      <nav>
        <h1>TODO SPA</h1>
        
        <ul>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Головна
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              Про мене
            </Link>
          </li>
          <li>
            <Link 
              to="/contacts" 
              className={location.pathname === '/contacts' ? 'active' : ''}
            >
              Контакти
            </Link>
          </li>
        </ul>
        
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Темна тема' : 'Світла тема'}
        </button>
      </nav>
    </header>
  );
}

export default Header;
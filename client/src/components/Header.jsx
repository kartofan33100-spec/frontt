import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header__content">
        <Link to="/" className="logo">Goal Tracker</Link>
        <nav className="nav">
          {user ? (
            <>
              <span className="nav_user">Привет, {user.name}</span>
              <button className="btn btn-small btn-outline" onClick={logoutHandler}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-small btn-outline">Вход</Link>
              <Link to="/register" className="btn btn-small">Регистрация</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

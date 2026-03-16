import { Link } from 'react-router-dom';

const HomePage = ({ user }) => {
  return (
    <section className="hero container">
      <div className="hero_content">
        <div className="hero_text">
          <h1>Отслеживай цели, дедлайны и прогресс в одном месте</h1>
          <p>
            Goal Tracker помогает создавать личные цели, отмечать процент выполнения
          </p>
          <div className="hero_actions">
            <Link to={user ? '/dashboard' : '/register'} className="btn">
              {user ? 'Перейти в кабинет' : 'Начать'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

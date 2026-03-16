import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../utils/api';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="card auth-form" onSubmit={submitHandler}>
        <div className="card_header">
          <h1>Вход в аккаунт</h1>
          <p>Войди, чтобы управлять своими целями.</p>
        </div>

        {error && <div className="message message-error">{error}</div>}

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={changeHandler} required />
        </label>

        <label>
          Пароль
          <input type="password" name="password" value={formData.password} onChange={changeHandler} required />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>

        <p className="auth-form_switch">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;

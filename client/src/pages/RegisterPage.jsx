import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../utils/api';

const RegisterPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      const response = await fetch(`${API_URL}/auth/register`, {
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
          <h1>Регистрация</h1>
          <p>Создай аккаунт, чтобы отслеживать свои цели.</p>
        </div>

        {error && <div className="message message-error">{error}</div>}

        <label>
          Имя
          <input type="text" name="name" value={formData.name} onChange={changeHandler} required />
        </label>

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={changeHandler} required />
        </label>

        <label>
          Пароль
          <input type="password" name="password" value={formData.password} onChange={changeHandler} required />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>

        <p className="auth-form_switch">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;

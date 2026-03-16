const API_URL = 'http://localhost:5000/api';

export const authFetch = async (endpoint, options = {}) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Ошибка запроса');
  }

  return data;
};

export default API_URL;

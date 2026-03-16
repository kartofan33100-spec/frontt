import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userInfo');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="app-shell">
      <Header user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" replace /> : <LoginPage setUser={setUser} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage setUser={setUser} />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage user={user} />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

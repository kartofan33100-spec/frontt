import { useEffect, useMemo, useState } from 'react';
import GoalForm from '../components/GoalForm';
import GoalCard from '../components/GoalCard';
import { authFetch } from '../utils/api';

const DashboardPage = ({ user }) => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await authFetch('/goals');
      setGoals(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const submitHandler = async (formData) => {
    setError('');
    try {
      if (editingGoal) {
        const updatedGoal = await authFetch(`/goals/${editingGoal._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        setGoals((prev) => prev.map((goal) => (goal._id === updatedGoal._id ? updatedGoal : goal)));
        setEditingGoal(null);
      } else {
        const newGoal = await authFetch('/goals', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        setGoals((prev) => [newGoal, ...prev]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteHandler = async (id) => {
    if (!window.confirm('Удалить эту цель?')) return;

    try {
      await authFetch(`/goals/${id}`, { method: 'DELETE' });
      setGoals((prev) => prev.filter((goal) => goal._id !== id));
      if (editingGoal?._id === id) setEditingGoal(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const stats = useMemo(() => {
    return {
      total: goals.length,
      completed: goals.filter((goal) => goal.status === 'completed').length,
      active: goals.filter((goal) => goal.status === 'active').length,
      overdue: goals.filter((goal) => goal.status === 'overdue').length,
    };
  }, [goals]);

  return (
    <section className="dashboard container">
      <div className="dashboard_intro">
        <div>
          <h1>Личный кабинет</h1>
          <p>Здесь {user.name} может создавать, обновлять и удалять только свои цели.</p>
        </div>
        <div className="stats-grid">
          <div className="stat-card"><span>{stats.total}</span><p>Всего целей</p></div>
          <div className="stat-card"><span>{stats.active}</span><p>Активных</p></div>
          <div className="stat-card"><span>{stats.completed}</span><p>Завершённых</p></div>
          <div className="stat-card"><span>{stats.overdue}</span><p>Просроченных</p></div>
        </div>
      </div>

      {error && <div className="message message-error">{error}</div>}

      <GoalForm
        onSubmit={submitHandler}
        editingGoal={editingGoal}
        cancelEdit={() => setEditingGoal(null)}
      />

      <div className="goals-section">
        <div className="section-title">
          <h2>Мои цели</h2>
          <p>Список загружается с backend после проверки JWT.</p>
        </div>

        {loading ? (
          <div className="card empty-state">Загрузка целей...</div>
        ) : goals.length === 0 ? (
          <div className="card empty-state">Пока нет целей. Добавь первую цель выше.</div>
        ) : (
          <div className="goals-grid">
            {goals.map((goal) => (
              <GoalCard
                key={goal._id}
                goal={goal}
                onEdit={setEditingGoal}
                onDelete={deleteHandler}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;

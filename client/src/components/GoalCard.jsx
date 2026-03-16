const statusMap = {
  active: 'Активна',
  completed: 'Завершена',
  overdue: 'Просрочена',
};

const GoalCard = ({ goal, onEdit, onDelete }) => {
  return (
    <div className="card goal-card">
      <div className="goal-card_top">
        <div>
          <h3>{goal.title}</h3>
          <p className="goal-card_description">{goal.description || 'Без описания'}</p>
        </div>
        <span className={`badge badge--${goal.status}`}>{statusMap[goal.status]}</span>
      </div>

      <div className="goal-card_meta">
        <p><strong>Дедлайн:</strong> {new Date(goal.deadline).toLocaleDateString('ru-RU')}</p>
        <p><strong>Прогресс:</strong> {goal.progress}%</p>
      </div>

      <div className="progress-bar">
        <div className="progress-bar_fill" style={{ width: `${goal.progress}%` }}></div>
      </div>

      <div className="goal-card_actions">
        <button className="btn btn-small btn-outline" onClick={() => onEdit(goal)}>
          Редактировать
        </button>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(goal._id)}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default GoalCard;

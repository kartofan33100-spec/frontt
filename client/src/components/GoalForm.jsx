import { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  deadline: '',
  progress: 0,
};

const GoalForm = ({ onSubmit, editingGoal, cancelEdit }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title,
        description: editingGoal.description,
        deadline: editingGoal.deadline?.slice(0, 10),
        progress: editingGoal.progress,
      });
    } else {
      setFormData(initialState);
    }
  }, [editingGoal]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, progress: Number(formData.progress) });
    if (!editingGoal) {
      setFormData(initialState);
    }
  };

  return (
    <form className="card form" onSubmit={submitHandler}>
      <div className="card_header">
        <h2>{editingGoal ? 'Редактировать цель' : 'Добавить новую цель'}</h2>
        <p>Укажи название, дедлайн и процент выполнения.</p>
      </div>

      <label>
        Название цели
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={changeHandler}
          placeholder="Например, сдать проект на 100 баллов"
          required
        />
      </label>

      <label>
        Описание
        <textarea
          name="description"
          value={formData.description}
          onChange={changeHandler}
          placeholder="Кратко опиши цель"
          rows="4"
        />
      </label>

      <div className="form__row">
        <label>
          Дедлайн
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={changeHandler}
            required
          />
        </label>

        <label>
          Прогресс (%)
          <input
            type="number"
            name="progress"
            value={formData.progress}
            onChange={changeHandler}
            min="0"
            max="100"
            required
          />
        </label>
      </div>

      <div className="form_actions">
        <button type="submit" className="btn">
          {editingGoal ? 'Сохранить изменения' : 'Добавить цель'}
        </button>
        {editingGoal && (
          <button type="button" className="btn btn--outline" onClick={cancelEdit}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

export default GoalForm;

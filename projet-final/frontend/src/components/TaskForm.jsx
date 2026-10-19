import { useState } from 'react';

export default function TaskForm({ task, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : '',
    priority: task?.priority || 'moyenne',
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await onSave({ ...form, dueDate: form.dueDate || undefined });
    if (!task) setForm({ title: '', description: '', dueDate: '', priority: 'moyenne' });
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <h2>{task ? 'Modifier la tâche' : 'Nouvelle tâche'}</h2>
      <input placeholder="Titre" value={form.title} onChange={set('title')} required />
      <textarea placeholder="Description" value={form.description} onChange={set('description')} />
      <div className="row">
        <input type="date" value={form.dueDate} onChange={set('dueDate')} />
        <select value={form.priority} onChange={set('priority')}>
          <option value="basse">Priorité basse</option>
          <option value="moyenne">Priorité moyenne</option>
          <option value="haute">Priorité haute</option>
        </select>
      </div>
      <div className="row">
        <button>{task ? 'Enregistrer' : 'Ajouter'}</button>
        {task && <button type="button" className="secondary" onClick={onCancel}>Annuler</button>}
      </div>
    </form>
  );
}

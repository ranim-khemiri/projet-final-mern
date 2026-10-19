import { useCallback, useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskItem from '../components/TaskItem.jsx';
import Filters from '../components/Filters.jsx';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({ status: '', search: '', sortBy: 'createdAt', order: 'desc' });
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      setTasks((await api.get('/tasks', { params })).data);
      setError('');
    } catch {
      setError('Impossible de charger les tâches');
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const save = async (data) => {
    if (editing) await api.put(`/tasks/${editing._id}`, data);
    else await api.post('/tasks', data);
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Supprimer cette tâche ?')) return;
    await api.delete(`/tasks/${id}`);
    load();
  };

  const toggle = async (t) => {
    await api.put(`/tasks/${t._id}`, { status: t.status === 'terminée' ? 'en cours' : 'terminée' });
    load();
  };

  const startEdit = (t) => {
    setEditing(t);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <header>
        <h1>Mes tâches</h1>
        <div>
          <span>Bonjour, {user.name}</span>
          <button className="secondary" onClick={logout}>Déconnexion</button>
        </div>
      </header>
      {error && <p className="error">{error}</p>}
      <TaskForm key={editing?._id || 'new'} task={editing} onSave={save} onCancel={() => setEditing(null)} />
      <Filters filters={filters} onChange={setFilters} />
      {tasks.length === 0 ? (
        <p className="empty">Aucune tâche à afficher.</p>
      ) : (
        <ul className="tasks">
          {tasks.map((t) => (
            <TaskItem key={t._id} task={t} onEdit={startEdit} onDelete={remove} onToggle={toggle} />
          ))}
        </ul>
      )}
    </div>
  );
}
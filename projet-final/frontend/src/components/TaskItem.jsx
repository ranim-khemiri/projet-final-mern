export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  const done = task.status === 'terminée';
  const late = task.dueDate && !done && new Date(task.dueDate) < new Date();

  return (
    <li className={`task ${done ? 'done' : ''}`}>
      <input type="checkbox" checked={done} onChange={() => onToggle(task)} />
      <div className="info">
        <strong>{task.title}</strong>
        {task.description && <p>{task.description}</p>}
        <small>
          <span className={`badge ${task.priority}`}>{task.priority}</span>
          <span className="badge">{task.status}</span>
          {task.dueDate && (
            <span className={late ? 'late' : ''}>
              Échéance : {new Date(task.dueDate).toLocaleDateString('fr-FR')}
            </span>
          )}
        </small>
      </div>
      <div className="actions">
        <button className="secondary" onClick={() => onEdit(task)}>Modifier</button>
        <button className="danger" onClick={() => onDelete(task._id)}>Supprimer</button>
      </div>
    </li>
  );
}

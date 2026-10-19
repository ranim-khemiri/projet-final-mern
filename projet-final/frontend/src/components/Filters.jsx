export default function Filters({ filters, onChange }) {
  const set = (k) => (e) => onChange({ ...filters, [k]: e.target.value });

  return (
    <div className="filters">
      <input placeholder="Rechercher (titre ou description)" value={filters.search} onChange={set('search')} />
      <select value={filters.status} onChange={set('status')}>
        <option value="">Tous les statuts</option>
        <option value="en cours">En cours</option>
        <option value="terminée">Terminées</option>
      </select>
      <select value={filters.sortBy} onChange={set('sortBy')}>
        <option value="createdAt">Date de création</option>
        <option value="dueDate">Échéance</option>
        <option value="priority">Priorité</option>
        <option value="title">Titre</option>
      </select>
      <select value={filters.order} onChange={set('order')}>
        <option value="desc">Décroissant</option>
        <option value="asc">Croissant</option>
      </select>
    </div>
  );
}

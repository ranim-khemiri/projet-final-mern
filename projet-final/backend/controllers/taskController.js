const Task = require('../models/Task');

// Étapes 3 et 5 : création, liste, filtrage, recherche et tri
exports.getTasks = async (req, res) => {
  try {
    const { status, search, sortBy = 'createdAt', order = 'desc' } = req.query;
    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (search) {
      const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ title: rx }, { description: rx }];
    }
    const allowed = ['createdAt', 'dueDate', 'priority', 'title'];
    const field = allowed.includes(sortBy) ? sortBy : 'createdAt';
    let tasks = await Task.find(filter).sort({ [field]: order === 'asc' ? 1 : -1 });
    if (field === 'priority') {
      const rank = { basse: 1, moyenne: 2, haute: 3 };
      tasks = tasks.sort((a, b) =>
        order === 'asc' ? rank[a.priority] - rank[b.priority] : rank[b.priority] - rank[a.priority]
      );
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Le titre est requis' });
    const task = await Task.create({ user: req.user._id, title, description, dueDate, priority, status });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Étape 4 : mise à jour et suppression (uniquement ses propres tâches)
exports.updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, dueDate, priority, status },
      { new: true, runValidators: true, omitUndefined: true }
    );
    if (!task) return res.status(404).json({ message: 'Tâche introuvable' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Tâche introuvable' });
    res.json({ message: 'Tâche supprimée', id: task._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

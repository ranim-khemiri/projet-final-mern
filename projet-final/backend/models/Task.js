const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: [true, 'Le titre est requis'], trim: true },
    description: { type: String, default: '', trim: true },
    dueDate: { type: Date },
    status: { type: String, enum: ['en cours', 'terminée'], default: 'en cours' },
    priority: { type: String, enum: ['basse', 'moyenne', 'haute'], default: 'moyenne' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);

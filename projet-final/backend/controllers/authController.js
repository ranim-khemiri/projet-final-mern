const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const payload = (u) => ({ _id: u._id, name: u.name, email: u.email, token: sign(u._id) });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Tous les champs sont requis' });
    if (password.length < 6) return res.status(400).json({ message: 'Mot de passe : 6 caractères minimum' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    const user = await User.create({ name, email, password });
    res.status(201).json(payload(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    res.json(payload(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.me = (req, res) => res.json(req.user);

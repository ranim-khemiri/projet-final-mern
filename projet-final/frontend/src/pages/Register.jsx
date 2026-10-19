import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'inscription");
    }
  };

  return (
    <div className="auth-card">
      <h1>Inscription</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe (6 car. min.)" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Créer mon compte</button>
      </form>
      <p>Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
    </div>
  );
}

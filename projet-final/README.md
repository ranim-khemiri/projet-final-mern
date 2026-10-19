# 📝 Application de gestion des tâches (MERN)

Application web complète de gestion des tâches, développée avec la pile **MERN** (MongoDB, Express.js, React, Node.js) dans le cadre d'un projet GoMyCode.

Chaque utilisateur crée son compte, se connecte et gère sa propre liste de tâches personnelle.

---

## ✨ Fonctionnalités

- **Authentification sécurisée** : inscription, connexion, mots de passe hachés (bcrypt), jeton JWT valable 7 jours.
- **Autorisation** : chaque utilisateur n'accède qu'à ses propres tâches.
- **Gestion des tâches** : créer, afficher, modifier et supprimer une tâche.
- **Informations d'une tâche** : titre, description, date d'échéance, priorité (basse, moyenne, haute) et statut (en cours, terminée).
- **Suivi de progression** : case à cocher pour marquer une tâche comme terminée, échéances dépassées affichées en rouge.
- **Recherche** dans le titre et la description.
- **Filtrage** par statut.
- **Tri** par date de création, échéance, priorité ou titre (croissant ou décroissant).
- **Interface responsive**, utilisable sur ordinateur et mobile.

---

## 🛠️ Technologies

| Partie          | Technologies                        |
| --------------- | ----------------------------------- |
| Frontend        | React 18, Vite, React Router, Axios |
| Backend         | Node.js, Express.js                 |
| Base de données | MongoDB, Mongoose                   |
| Sécurité        | JWT (jsonwebtoken), bcryptjs, CORS  |

---

## 📁 Structure du projet

```
projet-final/
├── backend/
│   ├── config/db.js              Connexion MongoDB
│   ├── controllers/              Logique métier (auth, tâches)
│   ├── middleware/auth.js        Vérification du jeton JWT
│   ├── models/                   Schémas User et Task
│   ├── routes/                   Routes de l'API
│   ├── server.js                 Point d'entrée du serveur
│   └── .env.example              Modèle des variables d'environnement
└── frontend/
    ├── src/
    │   ├── components/           TaskForm, TaskItem, Filters
    │   ├── context/              AuthContext (état de connexion)
    │   ├── pages/                Login, Register, Dashboard
    │   ├── api.js                Configuration d'Axios
    │   └── App.jsx               Routes de l'application
    └── vite.config.js
```

---

## 🚀 Installation en local

### Prérequis

- [Node.js](https://nodejs.org) (version LTS)
- MongoDB installé en local **ou** un cluster gratuit sur [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Backend

```bash
cd backend
npm install
```

Crée un fichier `.env` à partir du modèle :

```bash
# Windows PowerShell
Copy-Item .env.example .env
# macOS / Linux
cp .env.example .env
```

Renseigne les variables (voir le tableau plus bas), puis lance le serveur :

```bash
npm run dev
```

Le serveur démarre sur http://localhost:5000. Test rapide : http://localhost:5000/api/health doit renvoyer `{"status":"ok"}`.

### 2. Frontend

Dans un second terminal :

```bash
cd frontend
npm install
npm run dev
```

Ouvre http://localhost:5173 dans ton navigateur.

---

## ⚙️ Variables d'environnement

À définir dans `backend/.env` :

| Variable     | Description                          | Exemple                                  |
| ------------ | ------------------------------------ | ---------------------------------------- |
| `PORT`       | Port du serveur                      | `5000`                                   |
| `MONGO_URI`  | URI de connexion MongoDB             | `mongodb://127.0.0.1:27017/projet-final` |
| `JWT_SECRET` | Clé secrète pour signer les jetons   | une longue phrase aléatoire              |
| `CLIENT_URL` | Adresse du frontend autorisée (CORS) | `http://localhost:5173`                  |
| `NODE_ENV`   | Environnement                        | `development` ou `production`            |

> ⚠️ Ne publie jamais le fichier `.env` sur GitHub. Il est déjà exclu par le `.gitignore`.

---

## 🔌 API

### Authentification

| Méthode | Route                | Description                      | Protégée |
| ------- | -------------------- | -------------------------------- | -------- |
| POST    | `/api/auth/register` | Créer un compte                  | Non      |
| POST    | `/api/auth/login`    | Se connecter                     | Non      |
| GET     | `/api/auth/me`       | Profil de l'utilisateur connecté | Oui      |

### Tâches

Toutes les routes exigent l'en-tête `Authorization: Bearer <token>`.

| Méthode | Route            | Description                            |
| ------- | ---------------- | -------------------------------------- |
| GET     | `/api/tasks`     | Liste des tâches (avec filtres et tri) |
| POST    | `/api/tasks`     | Créer une tâche                        |
| PUT     | `/api/tasks/:id` | Modifier une tâche                     |
| DELETE  | `/api/tasks/:id` | Supprimer une tâche                    |

**Paramètres de `GET /api/tasks` :**

| Paramètre | Valeurs                                       |
| --------- | --------------------------------------------- |
| `status`  | `en cours`, `terminée`                        |
| `search`  | texte cherché dans le titre ou la description |
| `sortBy`  | `createdAt`, `dueDate`, `priority`, `title`   |
| `order`   | `asc`, `desc`                                 |

Exemple : `/api/tasks?status=en cours&sortBy=dueDate&order=asc`

**Exemple de corps pour créer une tâche :**

```json
{
  "title": "Rédiger le rapport",
  "description": "Introduction et conclusion",
  "dueDate": "2026-10-20",
  "priority": "haute"
}
```

---

## ☁️ Déploiement (Render + MongoDB Atlas)

1. **Base de données** : crée un cluster gratuit sur MongoDB Atlas, un utilisateur de base de données, autorise l'accès réseau, puis copie l'URI de connexion.
2. **GitHub** : pousse le projet sur un dépôt GitHub.
3. **Render** : _New > Web Service_, choisis ton dépôt, puis configure :
   - **Build command** : `cd frontend && npm install && npm run build && cd ../backend && npm install`
   - **Start command** : `cd backend && npm start`
   - **Variables d'environnement** : `NODE_ENV=production`, `MONGO_URI`, `JWT_SECRET`
4. En production, Express sert directement le build React : un seul service suffit, l'API et le site partagent la même adresse.
5. **Tests finaux** : inscription, connexion, ajout, modification, suppression, filtres, tri, déconnexion, puis rechargement de la page.

---

## 🧪 Checklist de test

- [ ] Inscription avec un nouvel email
- [ ] Connexion et déconnexion
- [ ] Ajout d'une tâche avec titre, description, échéance et priorité
- [ ] Modification d'une tâche
- [ ] Case à cocher « terminée »
- [ ] Suppression d'une tâche
- [ ] Recherche, filtre par statut et tri
- [ ] Les tâches d'un utilisateur ne sont pas visibles par un autre
- [ ] L'application reste utilisable sur mobile

---

## 🗺️ Progression du projet

| Étape | Contenu                               | État    |
| ----- | ------------------------------------- | ------- |
| 1     | Configuration du projet et du backend | ✅      |
| 2     | Authentification et autorisation      | ✅      |
| 3     | Création et liste des tâches          | ✅      |
| 4     | Mise à jour et suppression            | ✅      |
| 5     | Filtrage et tri                       | ✅      |
| 6     | Déploiement et finalisation           | À faire |

---

## 👩‍💻 Auteure

**Ranim Khemiri** — projet réalisé dans le cadre de la formation GoMyCode.

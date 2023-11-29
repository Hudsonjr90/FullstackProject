const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();

// Configuração da sessão
app.use(session({ secret: 'secretpass', resave: true, saveUninitialized: true }));

// Configuração do passport
app.use(passport.initialize());
app.use(passport.session());

const pool = new Pool({
    user: 'HudsonDb',
    host: 'localhost',
    database: 'Users',
    password: 'hudson22kj',
    port: 5432,
  });
  

// Configuração do modelo de usuário
passport.use(new LocalStrategy((username, password, done) => {
  pool.query('SELECT * FROM users WHERE username = $1', [username], (error, result) => {
    if (error) return done(error);
    if (result.rows.length === 0) return done(null, false, { message: 'Usuário não encontrado' });

    const user = result.rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Senha incorreta' });
    }

    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
    if (error) return done(error);
    done(null, result.rows[0]);
  });
});

// Rotas
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

app.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const { username, password } = req.body;

  pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword], (error, result) => {
    if (error) return res.status(500).send(error);
    res.send(result.rows[0]);
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.send('Logout realizado com sucesso');
});

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

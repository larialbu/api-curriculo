const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'db.ovpcpzngrjakaabavnnf.supabase.co',
  database: 'postgres',
  password: 'bNdWqwJebzzTenk3',
  port: 5432,
});

const getCurriculos = (request, response) => {
  pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCurriculoByNome = (request, response) => {
  const nome = request.params.nome;

  pool.query('SELECT * FROM curriculo WHERE nome = $1', [nome], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createCurriculo = (request, response) => {
  const {
    nome,
    sobrenome,
    email,
    telefone,
    formacao_academica,
    curso,
  } = request.body;

  pool.query(
    'INSERT INTO curriculo (nome, sobrenome, email, telefone, formacao_academica, curso) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [nome, sobrenome, email, telefone, formacao_academica, curso],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ id: results.rows[0].id });
    }
  );
};

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    nome,
    sobrenome,
    email,
    telefone,
    formacao_academica,
    curso,
  } = request.body;

  pool.query(
    'UPDATE curriculo SET nome = $1, sobrenome = $2, email = $3, telefone = $4, formacao_academica = $5, curso = $6 WHERE id = $7',
    [nome, sobrenome, email, telefone, formacao_academica, curso, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteCurriculo = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getCurriculos,
  getCurriculoByNome,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo,
};

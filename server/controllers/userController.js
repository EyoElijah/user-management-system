import pool from '../../db.js';

const allUser = async (req, res) => {
  pool.query('SELECT * FROM users WHERE status ="active"', (err, rows) => {
    if (err) throw err;
    return res.render('home', { rows });
  });
};

const findUser = async (req, res) => {
  const { query } = req.body;
  pool.query(
    `SELECT * FROM users WHERE first_name LIKE ?`,
    ['%' + query + '%'],
    (err, rows) => {
      if (err) throw err;
      res.render('home', { rows });
    }
  );
};

const userForm = async (req, res) => {
  res.render('addUser');
};

const createUser = async (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  pool.query(
    'INSERT INTO users SET first_name = ?, last_name = ?, email = ?, phone=?, comments=?',
    [first_name, last_name, email, phone, comments],
    (err, rows) => {
      if (!err) {
        res.render('addUser', { alert: 'user added successfully' });
      }
      console.log(err);
    }
  );
};

const editUser = async (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM users WHERE id = ?`, [id], (err, rows) => {
    if (err) throw err;

    res.render('editUser', { rows });
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, comments } = req.body;
  pool.query(
    'UPDATE users SET first_name = ? ,last_name=?, email = ?, phone =?, comments=? WHERE id =?',
    [first_name, last_name, email, phone, comments, id],
    (err, rows) => {
      if (err) throw err;
      pool.query('SELECT * FROM users WHERE id =?', [id], (err, rows) => {
        if (err) throw err;
        res.render('editUser', { rows, alert: `${first_name} has been updated` });
      });
    }
  );
};

const deleteUser = async (req, res) => {
  pool.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) throw err;
    res.redirect('/');
    console.log('rows :>> ', rows);
  });
};

const viewUser = async (req, res) => {
  pool.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) throw err;
    res.render('view-user', { rows });
    console.log('rows :>> ', rows);
  });
};

export {
  allUser,
  findUser,
  userForm,
  createUser,
  editUser,
  updateUser,
  deleteUser,
  viewUser,
};

const db = require('../db');

const fetchList = async () => {
  try {
    const users = await db.all('SELECT * FROM users');
    return users.rows;
  } catch (err) {
    throw new Error('Can\'t get users list');
  }
};

const fetchById = async (id) => {
  try {
    const user = await db.get(`SELECT * FROM users WHERE id = ${id}`);
    return user.row;
  } catch (err) {
    throw new Error('Can\'t fetch user');
  }
};
const create = async (userName) => {
  const sql = `INSERT INTO users (name) VALUES ("${userName}")`;
  try {
    const response = await db.run(sql);
    return response;
  } catch (err) {
    if (err.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.name') {
      throw new Error('This user exists');
    }
    throw new Error('Unknown error');
  }
};

module.exports = {
  fetchList,
  fetchById,
  create,
};

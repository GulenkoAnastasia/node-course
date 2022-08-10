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

module.exports = {
  fetchList,
  fetchById,
};

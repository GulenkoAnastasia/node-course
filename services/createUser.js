const db = require('../db');

async function createUser(req, res) {
  const userName = req.body.username;
  const sql = `INSERT INTO users (name) VALUES ("${userName}")`;
 
  try {
    const response = await db.run(sql);
    const query = `SELECT * FROM users WHERE id = ${response.statement.lastID}`;
    const user = await db.get(query);
    res.status(200).send(user.row);
  } catch (err) {
    console.log(err);
    res.status(400).send({status: 400, message: "Invalid name"});
  }
}

module.exports = createUser;

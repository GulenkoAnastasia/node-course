const fs = require('fs/promises');
const path = require('path');

async function getUserList (req, res) {
  try {
    const data = await fs.readFile(path.join(__dirname, '../api/users.json'));
    res.status(200).send(JSON.parse(data))
  }
  catch (err) {
    res.status(500).send({status: 500, message: 'The list of users doesn\'t exist'})
  }
}

module.exports = getUserList;
const fs = require('fs/promises');
const path = require('path')
const getId = require('../utils/getId');

async function createUser(req, res) {
  if (!req.body.username) {
    res.status(404).send({ status: 404, message: 'Invalid value' })
    return;
  }

  const user = {_id: getId(24), username: req.body.username, count: 0, log: []}
  let data = [];
  try {
    data = JSON.parse(await fs.readFile(path.join(__dirname, '../api/users.json'), 'utf-8'));
    const availableUser = data.find((person) => person.username === req.body.username);

    if (!availableUser) {
      data.push(user);
    } else {
      res.status(404).send({ status: 404, message: 'The user exists' })
      return;
    }
  } catch {
    data = [ user ];
  }
  
  await fs.writeFile(path.join(__dirname, '../api/users.json'), JSON.stringify(data, null, 2), 'utf-8');
  const { _id, username, ...rest} = user;
  res.status(200).send({username, _id});
}

module.exports = createUser;

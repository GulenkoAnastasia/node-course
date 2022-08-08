const fs = require('fs/promises');
const path = require('path');
const validate = require('../utils/exerciseValidation')

async function createExercise (req, res) {
  const inputData = {
    description: req.body.description,
    duration: Number(req.body.duration),
    date: req.body.date === "" ? new Date().toDateString() : 
        new Date(req.body.date).toDateString(),
  }

  const errors = validate(inputData);
  
  if(Object.keys(errors).length) {
    res.status(errors.status).send({status: errors.status, message: errors.message});
    return;
  }
  const [,,,id] = req.path.split('/');

  let data;
  try {
    data = await JSON.parse(await fs.readFile(path.join(__dirname, '../api/users.json'), 'utf-8'));
  } catch {
    res.status(500).send({status: 500, message: "The server doesn't respond"});
  }
  
  const user = data.find((person) => person._id === id);

  if (user) {
    user.log.push(inputData);
    user.count = user.count + 1;

    await fs.writeFile(path.join(__dirname, '../api/users.json'), JSON.stringify(data, null, 2), 'utf-8');

    const {username, _id, ...rest } = user;
    res.status(200).send({_id, username, ...inputData});
    return;
  }
  
  res.status(404).send({status: 404, message: 'The user doesn\'t exist'});
}

module.exports = createExercise;
const fs = require('fs/promises');
const path = require('path');

// const getExercises = async function(req, res) {
//   const [,,,id] = req.path.split('/');
//   const data = JSON.parse(await fs.readFile(path.join(__dirname, '../api/users.json'), 'utf-8'));

//   const userLogs = data.find((user) => user._id === id);
//   const { log } = userLogs;

//   if (req.query.from && req.query.to) {
//     userLogs.log = log.filter((exercise) => new Date(exercise.date) > new Date(req.query.from) && 
//       new Date(exercise.date) < new Date(req.query.to));
//       userLogs.count = userLogs.log.length;
//       res.send(userLogs);
//       return;
//   }
  
//   if (req.query.from) {
//     userLogs.log = log.filter((exercise) => new Date(exercise.date) > new Date(req.query.from));
//     userLogs.count = userLogs.log.length;
//     res.send(userLogs);
//     return;
//   }

//   if (req.query.to) {
//     userLogs.log = log.filter((exercise) => new Date(exercise.date) < new Date(req.query.to));
//     userLogs.count = userLogs.log.length;
//     res.send(userLogs);
//     return;
//   }

//   res.send(userLogs)

  
// }

module.exports = getExercises;
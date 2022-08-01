const router = require('express').Router();
const createUser = require('../services/createUser');
const createExercise = require('../services/createExercise');
const userService = require('../services/users');
const exercisesService = require('../services/exercises.js');


router.get('/', async function getUserList (req, res) {
  try {
    const data = await userService.fetchList();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({status: 500, message: err.message});
  }
});

router.get('/:id/logs', async function(req, res) {
  const { id } = req.params;
  try {
    const user = await userService.fetchById(id);
    const exercises = await exercisesService.fetchList({
      filters: {
        user_id: id,
      }
    });
    
    res.status(200).json({
      id: id,
      username: user.name,
      count: exercises.length,
      log: exercises,
    });
  } catch (err) {
    res.status(500).json({status: 500, message: err.message});
  }
  return;
});

router.post('/', createUser);
router.post('/:_id/exercises', createExercise);

module.exports = router;
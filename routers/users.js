const router = require('express').Router();
const userService = require('../services/users');
const exercisesService = require('../services/exercises');

router.get('/', async (req, res) => {
  try {
    const data = await userService.fetchList();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

router.get('/:id/logs', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.fetchById(id);
    const exercises = await exercisesService.fetchList({
      filters: {
        user_id: id,
        ...req.query,
      },
    });

    res.status(200).json({
      id,
      username: user.name,
      count: await exercisesService.getCountExercises(id),
      log: exercises,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

router.post('/', async (req, res) => {
  const userName = req.body.username;
  if (!userName) {
    res.status(400).send({ status: 400, message: 'User name is empty' });
    return;
  }

  try {
    const createUserResponse = await userService.create(userName);
    res.status(200).json({
      id: createUserResponse.statement.lastID,
      name: userName,
    });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
});

router.post('/:id/exercises', async (req, res) => {
  const { description, duration, date } = req.body;
  const convertedDate = date || new Date().toISOString().split('T')[0];

  const { id } = req.params;
  if (!description) {
    res.status(400).send({ status: 400, message: 'The description is empty' });
    return;
  }

  try {
    const createResponse = await exercisesService.create({
      description,
      duration,
      date: convertedDate,
      user_id: id,
    });

    const exerciseResponse = await exercisesService
      .fetchById(createResponse.statement.lastID);

    res.status(200).json({
      ...exerciseResponse,
      date: new Date(convertedDate).toDateString(),
    });
  } catch (err) {
    res.status(404).send({ status: 404, message: 'This user id doesn\'t exist' });
  }
});

module.exports = router;

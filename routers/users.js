const router = require('express').Router();
const userService = require('../services/users');
const exercisesService = require('../services/exercises');
const db = require('../db');

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
      count: exercises.length,
      log: exercises,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

router.post('/', async (req, res) => {
  const userName = req.body.username;
  const sql = `INSERT INTO users (name) VALUES ("${userName}")`;

  try {
    const response = await db.run(sql);
    const user = await userService.fetchById(response.statement.lastID);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send({ status: 400, message: 'Invalid name' });
  }
});

router.post('/:id/exercises', async (req, res) => {
  const { description, duration, date } = req.body;
  const convertedDate = date || new Date().toISOString;

  const { id } = req.params;

  try {
    const createResponse = await exercisesService.create({
      description,
      duration,
      date: convertedDate,
      user_id: id,
    });

    const exerciseResponse = await exercisesService
      .fetchById(createResponse.statement.lastID);

    res.status(200).json(await {
      ...exerciseResponse,
      date: new Date(convertedDate).toDateString(),
    });
  } catch (err) {
    res.status(400).send({ status: 400, message: 'bad request' });
  }
});

module.exports = router;

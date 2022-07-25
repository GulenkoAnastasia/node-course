const router = require('express').Router();
const createUser = require('../services/createUser');
const getUserList = require('../services/getUserList');
const createExercise = require('../services/createExercise');
const getExercises = require('../services/getExercises');

router.get('/', getUserList);
router.get('/:_id/logs', getExercises);

router.post('/', createUser);
router.post('/:_id/exercises', createExercise);

module.exports = router;
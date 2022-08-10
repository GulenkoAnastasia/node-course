const router = require('express').Router();
const path = require('path');
const usersRouter = require('./users');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
router.use('/api/users', usersRouter);

module.exports = router;

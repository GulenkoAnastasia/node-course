const router = require('express').Router();
const usersRouter = require('./users');
const path = require("path");

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
router.use('/api/users', usersRouter);

module.exports = router;

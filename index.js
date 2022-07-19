const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser')
const getId = require('./utils/getId')
const createUser = require('./services/createUser');
const getUserList = require('./services/getUserList');
const createExercise = require('./services/createExercise');
const getExercises = require('./services/getExercises')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.get('/api/users', getUserList);
app.get('/api/users/:_id/logs', getExercises)

app.post('/api/users', createUser);
app.post('/api/users/:_id/exercises', createExercise);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

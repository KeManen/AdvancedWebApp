let express = require('express');
let router = express.Router();
let users = require('../models/data');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { users: users});
});

router.post('/todo', (req, res) => {
  let isNewUser = users[req.body.name] == null
  let user = isNewUser ? { name: req.body.name, tasks:[]} : users[req.body.name];
  user.tasks.push(req.body.task);
  users[user.name] = user;
  if(isNewUser) res.send("User added");
  else res.send("Todo added");
})

module.exports = router;

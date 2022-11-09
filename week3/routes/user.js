let express = require('express');
let router = express.Router();
let users = require('../models/data');

/* GET users listing. */
router.get('/', function(req, res) {
  let user = users[req.query.name];
  if(user == null) res.send("User not found");
  else res.render('user', {user:user});
});

router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  if(users[req.params.id] == null) res.send("User not found");
  delete(users[req.params.id]);
  res.send("User deleted")
});

router.put('/', (req, res) => {
  console.log(req.body.name)
  let user = users[req.body.name];
  console.log(user)
  if(user != null){
    user.tasks= user.tasks.filter(item => item !== req.body.todo)
    res.send("Task deleted")
    return;
  }
  res.send("User not found");
});

module.exports = router;

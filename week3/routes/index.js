let express = require('express');
let router = express.Router();
let users = {};


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', );
});

router.post('/todo', (req, res) => {
  console.log(req.body)
  console.log(req.body.name)
  console.log(req.body.task)
  let isNewUser = users[req.body.name] == null
  let user = isNewUser ? { name: req.body.name, tasks:[]} : users[req.body.name];
  user.tasks.push(req.body.task);
  users[user.name] = user;
  if(isNewUser) res.send("User added");
  else res.send("Todo added");
})

/* GET users listing. */
router.get('/user/:id', function(req, res) {
  console.log(req.params.id)
  let user = users[req.params.id];
  console.log(users)
  console.log(user)
  if(user == null) res.send({"error":"User not found"});
  else res.send({"user":user});
});

router.delete('/user/:id', (req, res) => {
  if(users[req.params.id] == null) return res.send("User not found");
  delete(users[req.params.id]);
  res.send("User deleted")
});

router.put('/user/', (req, res) => {
  let user = users[req.body.name];
  console.log(user)
  if(user != null){
    user.tasks= user.tasks.filter(item => item !== req.body.todo)
    console.log(user)
    res.send("Task deleted")
    return;
  }
  res.send("User not found");
});


module.exports = router;

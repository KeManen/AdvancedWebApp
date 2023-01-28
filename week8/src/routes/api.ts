import express from 'express';
import { getLogger } from '@/utils/loggers';
import { User } from '@/utils/Users';
import bcrypt from 'bcrypt';
const router = express.Router();
const logger = getLogger('INDEX_ROUTE');

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

let users : User[] = []


/* GET home page. */
router.post('/user/register', function (_req, res, _next) {
  logger.info('apiRegister');
  if(_req.session.user) return res.redirect('/');
  
  let username = _req.body.username;
  let password = _req.body.password;
  logger.log(`username ${username} password ${password}`)
  if(nameExists(username)) return res.send(400);
  let id = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, id)
  let user = new User(id, username, hash);
  users.push(user);
  _req.session.user = user;
  return users.find(user => user.name === username);
});

router.get('/user/list', (_req, res, _next) =>{
  logger.info('apiList')
  return res.send(users);
});

router.post('/user/login', (_req, res, _next) => {
  logger.info('apiLogin');
  if(_req.session.user) return res.send(200);
  let username = _req.body.username;
  let password = _req.body.password;
  if(!login(username, password)) return res.send(401);

  _req.session.user = users.find(user => user.name === username);

  res.send(200);
});

router.get('/secret', (_req, res, _next) =>{
  if(!_req.session.user) return res.send(401);
  res.send(200);
});

router.post('/todos', (_req, res, _next) => {

});

router.get('/todos/list', (_req, res, _next) => {

});



function nameExists(name: string): boolean{
  users.forEach(user => {
    if(user.name === name) return true;
  });
  return false;
}

function login(name: string, password: string): boolean{
  let user : User | undefined = users.find(user => user.name === name);
  if(user == undefined) return false;
  return bcrypt.compareSync(password, user.password)
}



export default router;

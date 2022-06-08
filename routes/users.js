var express = require('express');
var router = express.Router();

const users = [
  {
    username: 'username01',
    password: 'secretpassword'
  },
  {
    username: 'username02',
    password: 'secretpassword'
  },
  {
    username: 'username03',
    password: 'secretpassword'
  }
];

/* GET users listing. */
router.get('/', function(req, res, next) { // /users/
  res.send(users);
});

router.get('/:username', function(req, res, next) { // /users/:username
  res.send(users.find(user => user.username === req.params.username));
});

router.post('/', function(req, res, next) {
  /**
    {
      "username": "username@mail.com",
      "password": "secret_password_please_hash_it"
    }
  */
  const {username, password} = req.body;
  console.log(username, password);
  const newUser = {
    username: username,
    password: btoa(password + process.env.MIGRACODE_VARIABLE) // depracted
  };
  users.push(newUser);
  res.sendStatus(201);
});

// AUTHORIZATION -> do you have permission to access a resource/url? (roles)
// AUTHENTICATION -> is this person who he says he is? (username and password)

module.exports = router;
"secret_password_please_hash_jt_"
09384570918732890746109283764 => "93lkj46hn7kj4h56gb7kj45h67ggh"
09875696847958764958769458769 => "uqywteuyqtwueytqwueytkjnshdfi"

username311:admin1234

username311
09875696847958764958769458769 => "uqywteuyqtwueytqwueytkjnshdfi"
username299
09875696847958764958769458769 => "uqywteuyqtwueytqwueytkjnshdfi"


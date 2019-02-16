const express = require('express');
const app = express();
const fs = require('fs');

/**
 * 1) Собираешь данные с формы
 * 2) отправляешь запрос на сервер (fetch('http://localhost:3000/signup'))
 * 3)
 */

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/signup/:login/:password', (req, res) => {
  const { login, password } = req.params;

  fs.readFile('data.json', (err, data) => {
    if (err) {
      res.sendStatus(404);
    }

    const users = JSON.parse(data);

    const findedUser = users.find(user => user.login === login);

    if (findedUser) {
      res.sendStatus(400);
    } else {
      users.push({ login, password });

      fs.writeFile('data.json', JSON.stringify(users), err => {
        if (err) {
          res.sendStatus(500);
        }

        setTimeout(() => res.sendStatus(200), 3000);
      });
    }
  });
});

app.get('/signin/:login/:password', (req, res) => {
  const { login, password } = req.params;

  fs.readFile('data.json', (err, data) => {
    if (err) {
      res.sendStatus(404);
    }

    const users = JSON.parse(data);
    const findedUser = users.find(user => user.login === login && user.password === password);

    if (findedUser) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
});

app.listen(3000, () => {
  console.log('Example simple authorization server on port 3000!');
});

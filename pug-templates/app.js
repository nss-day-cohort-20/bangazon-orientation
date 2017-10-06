'use strict';

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('larry', 'My name is not Larry');

// console.log('locals', app.locals.settings);

app.use(express.static(__dirname + '/public'));

// app.get('/monkeys', (req, res, next) => {
  //   res.sendFile(__dirname + 'monkeys.html')
  // });

const names = ["Larry", "Moe", "Curly", "Linda"]
app.get('/', (req, res, next) => {
  res.render('index', {
    subtitle: "This came from my JS data",
    names,
    loggedIn: false,
    url: `${req.url}`
  });
});

app.get('/article', (req, res, next) => {
  res.render('article', {
    subtitle: "This came from my article data",
    names,
    loggedIn: true
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000' );
});



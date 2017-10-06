'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// const { Show, Director, User } = require('./models');
app.set('models', require('./models'));
const { User, Show, Director } = app.get('models');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Show routes
app.get('/shows', (req, res, next) => {
  Show.findAll({include: [{model: Director}]})
  .then( (shows) => {
    res.status(200).json(shows);
  })
  .catch( (err) => {
    console.log('ooops', err );
    res.status(500).json({"error": err})
  });
});

app.get('/shows/:id', (req, res, next) => {
  Show.findOne({raw: true, where: {id: req.params.id}, include: [{model: Director}] })
  .then( (show) => {
    console.log('show', show);
    res.status(200).json(show)
  })
  .catch( (err) => {
    console.log('ooops', err );
    res.status(500).json({"error": err})
  });
});

// Show.destroy
// Show.create
// Show.update

//Users
//Adding Favorite to a user
// app.post('/favorites', ({body: {UserId, ShowId}, res, next}) => {
//   User.findById(UserId)
//   .then( (foundUser) => {
//     // addFavorite auto-created when belongsToMany relationship established in the models
//     foundUser.addFavorite(ShowId)
//     .then ( (newRecord) => {
//       res.status(201).json(newRecord);
//     });
//   });
// });

app.put('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then( (foundUser) => {
    console.log('User\'s full name', foundUser.getFullName() );

    let func = req.body.ShowId ? 'addFavorite' : 'update';
    foundUser[func](req.body.ShowId || req.body)
    .then( (stuff) => {
      res.status(201).json(stuff);
    });
  });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

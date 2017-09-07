let express = require('express');
let app = express();

// middleware
// const logParams = (req, res, next) => {
//   console.log("Middleware function awesomeness");
//   // console.log('request', req);
//   console.log('req.params', req.params );
//   console.log('req.url from "logParams"', req.url );
//   next();
// };

// const anotherMiddleware = (req, res, next) => {
//   console.log('req.url from "anotherMiddleware"', req.url);
//   next();
// }

// const checkEmsTheory = (req, res, next) => {
//   console.log("This runs no matter what");
//   next();
// }

// With no route arg, middleware will run on every request
// app.use(logParams);

// With a route arg, this will run only when it matches the request URL
// app.use('/hello', anotherMiddleware);
// app.get('/hello', anotherMiddleware);

// app.use(checkEmsTheory);

let routes = require('./routes/');

app.use(`/api/v1/`, routes);

app.use( (req, res, next) => {
  let err = new Error('Not Found, dummy');
  err.status = 404;
  next("This got passed along");
});

app.use( (err, req, res, next) => {
  res.status( err.status || 500);
  res.json({
    message: "You blew it",
    err: err
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000'); 
});

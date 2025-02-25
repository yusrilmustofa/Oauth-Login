const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./login/auth');

const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      req.session.destroy();
      res.send('Goodbye!');
    });
  });
  
  

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.listen(4500, () => console.log('listening on port: 4500'));
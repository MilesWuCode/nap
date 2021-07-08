const app = require('express')()
const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const AppleStrategy = require('passport-apple')
const axios = require('axios')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    name: 'session',
    keys: ['987654321'],
    maxAge: 24 * 60 * 60 * 1000 * 30 // 30 days
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      callbackURL: process.env.APPLE_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    function (req, accessToken, refreshToken, idToken, profile, done) {
      // wip
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : '',
        photo: profile.photos ? profile.photos[0].value : '',
        accessToken,
        provider: 'apple',
      }

      console.log(user)

      return done(null, user)
    }
  )
)

passport.serializeUser((user, done) => {
  // console.log('serializeUser', user)
  done(null, user)
})

passport.deserializeUser((user, done) => {
  // console.log('deserializeUser', user)
  done(null, user)
})

app.get('/', passport.authenticate('apple'))

app.get(
  '/callback', (req, res, next) =>
  passport.authenticate('apple', (err, user, info) => {
    if (err) return next(err);

    if (!user) return res.redirect('/login')

    req.login(user, err => {
      if (err) return next(err);

      res.cookie('strategy', 'apple')
      res.cookie('token', user.accessToken)

      res.redirect('/');
    });
  })(req, res, next)
);

app.get('/user', (req, res) => {

  // userData from cookie-session

  res.json({ user: req.user })

  // userData from provider

  // wip
})

app.post('/logout', (req, res) => {
  req.logout()
  res.json({ status: 'OK' })
})

module.exports = app

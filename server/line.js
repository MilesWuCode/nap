const app = require('express')()
const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const LineStrategy = require('passport-line-auth').Strategy
const jwt = require('jsonwebtoken')
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
  new LineStrategy(
    {
      channelID: process.env.LINE_CLIENT_ID,
      channelSecret: process.env.LINE_CLIENT_SERECT,
      callbackURL: process.env.LINE_CALLBACK_URL,
      scope: ['profile', 'openid', 'email'],
      botPrompt: 'normal',
      uiLocales: 'zh-TW',
    },
    function (accessToken, refreshToken, params, profile, done) {
      const { email } = jwt.decode(params.id_token)

      const user = {
        id: profile.id,
        name: profile.displayName,
        email,
        photo: profile.pictureUrl,
        accessToken,
        provider: 'line',
      }

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

app.get('/', passport.authenticate('line'))

app.get(
  '/callback', (req, res, next) =>
  passport.authenticate('line', (err, user, info) => {
    if (err) return next(err);

    if (!user) return res.redirect('/login')

    req.login(user, err => {
      if (err) return next(err);

      res.cookie('strategy', 'line')
      res.cookie('token', user.accessToken)

      res.redirect('/');
    });
  })(req, res, next)
);

app.get('/user', (req, res) => {

  // userData from cookie-session

  res.json({ user: req.user })

  // userData from provider

  /*
  try {
    const apiData = await await axios.post('https://api.line.me/v2/profile', {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization,
      }
    })

    const user = {
      id: apiData.data.userId,
      name: apiData.data.displayName,
      photo: apiData.data.pictureUrl,
    }

    res.json({ user })
  } catch (e) {
    res.status(e.response.status).send({ error: e.message })
  }
  */
})

app.post('/logout', (req, res) => {
  req.logout()
  res.json({ status: 'OK' })
})

module.exports = app

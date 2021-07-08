const app = require('express')()
const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
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
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SERECT,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {

      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : '',
        photo: profile.photos ? profile.photos[0].value : '',
        accessToken,
        provider: 'google',
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

app.get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }))

app.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.cookie('strategy', 'google')

    res.cookie('token', req.user.accessToken)

    res.redirect('/')
  })

app.get('/user', (req, res) => {

  // userData from cookie-session

  res.json({ user : req.user })

  // userData from provider

  /*
  try {
    const apiData = await await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization,
      }
    })

    const user = {
      id: apiData.data.sub,
      name: apiData.data.name,
      email: apiData.data.email,
      photo: apiData.data.picture,
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

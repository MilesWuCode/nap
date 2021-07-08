const app = require('express')()
const express = require('express')
const cookieSession = require('cookie-session')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    name: 'session',
    keys: ['987654321'],
    maxAge: 24 * 60 * 60 * 1000 * 30 // 30 days
  })
)

app.post('/login', (req, res) => {
  res.json({
    access_token: "fake.access.token",
    refresh_token: "fake.refresh.token",
  })
})

app.post('/refresh', (req, res) => {
  res.json({
    access_token: "fake.access.token",
    refresh_token: "fake.refresh.token",
  })
})

app.get('/user', (req, res) => {
  res.json({ user: { id: '25', name: 'fake', email: 'fake@mail.com' } })
})

app.post('/logout', (req, res) => {
  req.logout()
  res.json({ status: 'OK' })
})

module.exports = app

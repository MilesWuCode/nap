# Nuxt Auth with Passport.js Example Code (NAP)

## Setting

- .env

## Nuxt Auth

- pages/login.vue
  - loginWith then redirect to (previous or private) page

- middleware/passport.js
  - setStrategy
  - setUserToken
  - redirect to (previous or private) page

## Passport.js

- if yout need create user to owner database

```js
  // http://www.passportjs.org/docs/google/
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
```

- server/google.js
- server/facebook.js
- server/apple.js (wip)
- server/line.js

## Features

- Google
- Facebook
- Apple (wip)
- Line

## Nuxt https (Facebook Test)

- https://letsencrypt.org/zh-tw/docs/certificates-for-localhost/

```sh
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
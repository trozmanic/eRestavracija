const passport = require('passport');
const LokalnaStrategija = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');

passport.use(
    new LokalnaStrategija(
      {
        usernameField: 'email_naslov',
        passwordField: 'geslo'
      },
      (uporabniskoIme, geslo, pkKoncano) => {
        Uporabnik.findOne(
          { email_naslov: uporabniskoIme },
          (napaka, uporabnik) => {
            if (napaka)
              return pkKoncano(napaka);
            if (!uporabnik) {
              return pkKoncano(null, false, {
                "sporočilo": "Napačno uporabniško ime"
              });
            }
            if (!uporabnik.preveriGeslo(geslo)) {
              return pkKoncano(null, false, {
                "sporočilo": "Napačno geslo"
              });
            }
            return pkKoncano(null, uporabnik);
          }
        );
      }
    )
  );
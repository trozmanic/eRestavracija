const axios = require('axios');
const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://aldente-sp-20-21.herokuapp.com';
}

const login = function (req, res) {
    const uporabnik = req.body;
    const email_naslov = uporabnik.email_naslov;
    axios
        .get(apiParametri.streznik + "/api/uporabniki?email=" + email_naslov)
        .then((response) => {
            const uporabnikDB = response.data[0];
            if (!uporabnikDB) {
                return res.status(404).send({"error_message": "Napacni podatki, poskusite ponovno"})
            }
            if (uporabnik.geslo !== uporabnikDB.geslo) {
                return res.status(401).send({"error_message": "Napacni podatki, poskusite ponovno"})
            }
            req.session.uporabnik_id = uporabnikDB._id;
            req.session.vloga = uporabnikDB.vloga;
            req.session.ime = uporabnikDB.ime;
            return res.status(200).send({"uporabnik_id": uporabnikDB._id.toString(), "vloga": uporabnikDB.vloga});
        })
        .catch((err)=> {
            return res.status(500).send({"error_message": err})
        })
}

module.exports = {
    login
}

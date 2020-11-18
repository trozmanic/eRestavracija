const axios = require('axios');
const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    //TODO: include heroku
    apiParametri.streznik = "";
}

const login = function (req, res) {
    const uporabnik = req.body;
    const email_naslov = uporabnik.email_naslov;
    console.log(uporabnik)
    axios
        .get(apiParametri.streznik + "/api/uporabniki?email=" + email_naslov)
        .then((response) => {
            const uporabnikDB = response.data[0];
            if (!uporabnikDB) {
                return res.status(404).send({"error_message": "No user with given email"})
            }
            if (uporabnik.geslo !== uporabnikDB.geslo) {
                return res.status(401).send({"error_message": "Wrong credentials"})
            }
            return res.status(200).send({"uporabnik_id": uporabnikDB._id.toString(), "vloga": uporabnikDB.vloga});
        })
        .catch((err)=> {
            return res.status(500).send({"error_message": err})
        })
}

module.exports = {
    login
}

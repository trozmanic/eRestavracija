const axios = require('axios');
const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://aldente-sp-20-21.herokuapp.com/';
}

const register = function (req, res) {
    const uporabnik = req.body;
    console.log(JSON.stringify(uporabnik) + ": body");
    axios
        .post(apiParametri.streznik + "/api/uporabniki", uporabnik)
        .then((credentials) => {
            return res.status(201).json(credentials.data);
        })
        .catch((err)=> {
            return res.status(500).json({"error_message": err})
        })
}

module.exports = {
    register
}

const axios = require('axios');
const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://aldente-sp-20-21.herokuapp.com/';
}

const initDB = async function(req, res){


    // menu item
    axios.post(apiParametri.streznik + '/api/meni', {
        ime: 'hobotnica',
        opis: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, corrupti fugit! Ex expedita fugit velit delectus dolore numquam vitae, ab nam voluptates eius? Omnis necessitatibus inventore debitis voluptate nobis velit!',
        kalorije: 124,
        slika: '/images/jedi/2.png',
        cena: 12,
        sestavine: [
            {
                sestavina: 'egg',
                kolicina: 100
            },
            {
                sestavina: 'oli',
                kolicina: 2
            }
        ]
    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    })


    axios.post(apiParametri.streznik + '/api/meni', {
        ime: 'kalamari na zaru',
        opis: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, corrupti fugit! Ex expedita fugit velit delectus dolore numquam vitae, ab nam voluptates eius? Omnis necessitatibus inventore debitis voluptate nobis velit!',
        kalorije: 224,
        slika: '/images/jedi/3.png',
        cena: 12,
        sestavine: [
            {
                sestavina: 'egg',
                kolicina: 100
            },
            {
                sestavina: 'oli',
                kolicina: 2
            }
        ]
    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    })

    axios.post(apiParametri.streznik + '/api/meni', {
        ime: 'ocvrti kalamari',
        opis: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, corrupti fugit! Ex expedita fugit velit delectus dolore numquam vitae, ab nam voluptates eius? Omnis necessitatibus inventore debitis voluptate nobis velit!',
        kalorije: 424,
        slika: '/images/jedi/4.png',
        cena: 12,
        sestavine: [
            {
                sestavina: 'egg',
                kolicina: 100
            },
            {
                sestavina: 'oli',
                kolicina: 2
            }
        ]
    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    })


    axios.post(apiParametri.streznik + '/api/meni', {
        ime: 'morska solata',
        opis: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, corrupti fugit! Ex expedita fugit velit delectus dolore numquam vitae, ab nam voluptates eius? Omnis necessitatibus inventore debitis voluptate nobis velit!',
        kalorije: 200,
        slika: '/images/jedi/5.png',
        cena: 12,
        sestavine: [
            {
                sestavina: 'egg',
                kolicina: 100
            },
            {
                sestavina: 'oli',
                kolicina: 2
            }
        ]
    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    })


    axios.post(apiParametri.streznik + '/api/meni', {
        ime: 'tuna',
        opis: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, corrupti fugit! Ex expedita fugit velit delectus dolore numquam vitae, ab nam voluptates eius? Omnis necessitatibus inventore debitis voluptate nobis velit!',
        kalorije: 370,
        slika: '/images/jedi/7.png',
        cena: 12,
        sestavine: [
            {
                sestavina: 'tuna',
                kolicina: 300
            },
            {
                sestavina: 'oli',
                kolicina: 2
            }
        ]
    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    })

    axios.post(apiParametri.streznik + '/api/meni', {
        ime: 'rizota',
        opis: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, corrupti fugit! Ex expedita fugit velit delectus dolore numquam vitae, ab nam voluptates eius? Omnis necessitatibus inventore debitis voluptate nobis velit!',
        kalorije: 230,
        slika: '/images/jedi/7.png',
        cena: 12,
        sestavine: [
            {
                sestavina: 'riz',
                kolicina: 250
            },
            {
                sestavina: 'oli',
                kolicina: 2
            }
        ]
    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    })

    // surovine

    axios.post(apiParametri.streznik+'/api/zaloga', {
        ime: 'krompir',
        kolicina: 100,
        enota: 'kg',
        cena: 20
    }).then((res) => {

    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    });

    axios.post(apiParametri.streznik+'/api/zaloga', {
        ime: 'moka',
        kolicina: 20,
        enota: 'kg',
        cena: 12
    }).then((res) => {

    }).catch((err) => {
         return res.status(500).json({"error_message": err});
    });

    axios.post(apiParametri.streznik+'/api/zaloga', {
        ime: 'solata',
        kolicina: 10,
        enota: 'kg',
        cena: 30
    }).then((res) => {

    }).catch((err) => {
         return res.status(500).json({"error_message": err});
    });

    axios.post(apiParametri.streznik+'/api/zaloga', {
        ime: 'kaviar',
        kolicina: 500,
        enota: 'ml',
        cena: 800
    }).then((res) => {

    }).catch((err) => {
         return res.status(500).json({"error_message": err});
    });

    axios.post(apiParametri.streznik+'/api/zaloga', {
        ime: 'tuna',
        kolicina: 50,
        enota: 'kg',
        cena: 1000
    }).then((res) => {

    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    });

    axios.post(apiParametri.streznik+'/api/uporabniki', {
        ime: 'kuhar',
        email_naslov: 'kuhar@aldente.si',
        telefonska_stevilka: '070000878',
        geslo: 'geslo1234',
        vloga: 'kuhar'
    }).then((response) => {
        axios.get(apiParametri.streznik+'/api/urnik/?uporabnik_id='+response.data._id+'&leto=2020&mesec=11').catch((err) => {
            return res.status(500).json({"error_message": err});
        });
    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    });

    axios.post(apiParametri.streznik+'/api/uporabniki', {
        ime: 'natakar',
        email_naslov: 'natakar@aldente.si',
        telefonska_stevilka: '070000111',
        geslo: 'geslo1234',
        vloga: 'natakar'
    }).then((response) => {
        axios.get(apiParametri.streznik+'/api/urnik/?uporabnik_id='+response.data._id+'&leto=2020&mesec=11').catch((err) => {
            return res.status(500).json({"error_message": err});
        });
    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    });

    axios.post(apiParametri.streznik+'/api/uporabniki', {
        ime: 'gost',
        email_naslov: 'gost@aldente.si',
        telefonska_stevilka: '070000222',
        geslo: 'geslo1234',
        vloga: 'gost'
    }).then((response) => {
        var datum = new Date();
        datum.setFullYear(new Date().getFullYear());
        datum.setMonth(new Date().getMonth());
        datum.setDate(new Date().getDate() +3 );
        datum.setHours(12);
        axios.post(apiParametri.streznik+'/api/rezervacija', {
            datum_in_ura: datum,
            stOseb: 4,
            uporabnik_id: response.data._id
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        return res.status(500).json({"error_message": err});
    });

    axios.post(apiParametri.streznik+'/api/uporabniki', {
        ime: 'admin',
        email_naslov: 'admin@aldente.si',
        telefonska_stevilka: '070000333',
        geslo: 'geslo1234',
        vloga: 'admin'
    });


    return res.status(200);

}

const db = async function(req, res){
    res.render('nastavi_bazo', { layout: 'layout_nadzorna_plosca.hbs', title: 'Database init'});
}

module.exports =  {
    initDB,
    db
}
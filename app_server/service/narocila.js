const axios = require('axios');
const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
}
if (process.env.NODE_ENV === 'production') {
    //TODO: include heroku
    apiParametri.streznik = "";
}

const prepKuhar = (narocila) => {
    return new Promise (async (resolve,reject) => {
        let retObj = {
            vrsta: [],
            priprava: []
        }
        for (let index =0; index < narocila.length ; index ++) {
            const narocilo = narocila[index];
            const datum = new Date(narocilo.datum_in_ura);
            narocilo.date = datum.getDate() + "/" + (datum.getMonth() + 1) + "/" + datum.getFullYear();
            const minute = datum.getUTCMinutes() < 10 ? '0'+datum.getUTCMinutes(): datum.getUTCMinutes();
            narocilo.ura = (datum.getUTCHours()+1) + ":" + minute;
            if (narocilo.stanje === "sprejeto" || narocilo.stanje === "v pripravi") {
                for (let indexJedi = 0; indexJedi < narocilo.meni_items.length; indexJedi ++) {
                    const idJedi = narocilo.meni_items[indexJedi].meni_item;
                    try{
                        const response = await axios.get(apiParametri.streznik + "/api/meni/" + idJedi);
                        narocila[index].meni_items[indexJedi].meni_item = response.data;
                    }catch (err) {
                        console.log(err);
                        const errorMessage = {
                            "ime": "Ni podatkov"
                        }
                        narocila[index].meni_items[indexJedi].meni_item = errorMessage;
                    }

                }
            }

            if (narocilo.stanje === "sprejeto") {
                retObj.vrsta.push(narocilo);
            }
            else if (narocilo.stanje === "v pripravi") {
                retObj.priprava.push(narocilo);
            }
            else {
                continue;
            }

        }
        resolve(retObj)
    })
}

// const prepKuhar = (narocila) => {
//     let retObj = {
//         vrsta: [],
//         priprava: []
//     }
//     for (let index =0; index < narocila.length ; index ++) {
//         const narocilo = narocila[index];
//         const datum = new Date(narocilo.datum_in_ura);
//         narocilo.datum = datum.getDate() + '/' + datum.getMonth() + '/' + datum.getFullYear();;
//         if (narocilo.stanje === "sprejeto") {
//             retObj.vrsta.push(narocilo);
//         }
//         else if (narocilo.stanje === "v pripravi") {
//             retObj.priprava.push(narocilo);
//         }
//     }
//     return retObj;
// }

const prepNatakar = (narocila, idUporabnika) => {
    return new Promise(async (resolve, reject) => {
        let retObj = {
            vrsta:[],
            priprava:[],
            postrezena:[]
        }

        for (let index = 0; index < narocila.length ; index ++) {
            let narocilo = narocila[index];
            const datum = new Date(narocilo.datum_in_ura);
            const minute = datum.getUTCMinutes() < 10 ? '0'+datum.getUTCMinutes(): datum.getUTCMinutes();
            narocilo.datum =  datum.getDate() + '/' + datum.getMonth() + '/' + datum.getFullYear();
            narocilo.ura = (datum.getUTCHours()+1) + ":" + minute;




            if (idUporabnika && narocilo.natakar) {
                console.log(idUporabnika)
                console.log(narocilo.natakar.id_uporabnika);
                //To narocilo ni od tega uporbnika ...
                if (idUporabnika !== narocilo.natakar.id_uporabnika) {
                    continue;
                }
            }

            for (let indexJedi = 0; indexJedi < narocila[index].meni_items.length; indexJedi ++) {
                const idJedi = narocila[index].meni_items[indexJedi].meni_item;
                console.log(idJedi);

                try {
                    const response = await axios.get(apiParametri.streznik + "/api/meni/" + idJedi);
                    narocila[index].meni_items[indexJedi].meni_item = response.data;
                }catch (err) {
                    console.log(err);
                    const errorMessage = {
                        "ime": "Ni podatkov"
                    }
                    narocila[index].meni_items[indexJedi].meni_item = errorMessage;
                }
            }


            if (narocilo.stanje === "sprejeto") {
                retObj.vrsta.push(narocilo);
            }
            if (narocilo.stanje === "pripravljeno") {
                retObj.priprava.push(narocilo);
            }
            if (narocilo.stanje === "postrezeno") {
                retObj.postrezena.push(narocilo);
            }
        }

        resolve(retObj);

    })
}
//
// const prepNatakar = (narocila, idUporabnika) => {
//     let retObj = {
//         vrsta:[],
//         priprava:[],
//         postrezena:[]
//     }
//
//     for (let index = 0; index < narocila.length ; index ++) {
//         let narocilo = narocila[index];
//         const datum = new Date(narocilo.datum_in_ura);
//         let myEuroDate = datum.getDate() + '/' + datum.getMonth() + '/' + datum.getFullYear();
//         narocilo.datum =  myEuroDate;
//         narocilo.ura = datum.getUTCHours() + ":" + datum.getUTCMinutes();
//
//         for (let indexJedi = 0; indexJedi < narocila.meni_items.length; indexJedi ++) {
//             const idJedi = narocila.meni_items[indexJedi].meni_item;
//
//             //get meni item from DB
//             axios.get(apiParametri + "/api/meni/" + idJedi)
//                 .then((response) => {
//                     const jed = response.data;
//                     narocila.meni_items[indexJedi].meni_item = jed;
//                 })
//                 .catch((error)=> {
//                     const errorMessage = {
//                         "ime": "Ni podatkov"
//                     }
//                     narocila.meni_items[indexJedi].meni_item = errorMessage;
//                 })
//         }
//
//
//
//         if (idUporabnika && narocilo.natakar) {
//             console.log(idUporabnika)
//             console.log(narocilo.natakar.id_uporabnika);
//             //To narocilo ni od tega uporbnika ...
//             if (idUporabnika !== narocilo.natakar.id_uporabnika) {
//                 continue;
//             }
//         }
//
//
//         if (narocilo.stanje === "sprejeto") {
//             retObj.vrsta.push(narocilo);
//         }
//         if (narocilo.stanje === "pripravljeno") {
//             retObj.priprava.push(narocilo);
//         }
//         if (narocilo.stanje === "postrezeno") {
//             retObj.postrezena.push(narocilo);
//         }
//     }
//     return retObj;
// }

module.exports = {
    prepKuhar,
    prepNatakar
}

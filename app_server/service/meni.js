const axios = require('axios');
const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    //TODO: include heroku
    apiParametri.streznik = "";
}

const pridobiMeni = async (id_uporabnika) => {
    return new Promise (async (resolve, reject) => {
        try {
            const meni = await axios.get(apiParametri.streznik + "/api/meni");
            meni.data.forEach((jed) => {
                const ocena = parseInt(jed.ocena);
                const ocena_count = parseInt(jed.ocena_count);
                delete jed.ocena
                delete jed.ocena_count
                if (ocena_count === 0) {
                    jed.ocena = 0;
                }else {
                    jed.ocena =  Math.round(ocena/ocena_count);
                }
            })
            console.log(meni.data);
            console.log("meni: " + meni.data);
            let meniRenderData = [];
            if (id_uporabnika) {
                const uporabnik  = await axios.get(apiParametri.streznik + "/api/uporabniki/" + id_uporabnika);
                //Pregledamo ce je uporabnik gost - samo gost lahko ocnejuje jedi
                if (uporabnik.data.vloga === "gost") {
                    const gost = await  axios.get(apiParametri.streznik + "/api/gost/" + id_uporabnika);
                    const gostJedi = gost.data.ocenjene_jedi;
                    console.log ("gost: " + JSON.stringify(gost.data));
                    meni.data.forEach((meniJed) => {
                        let obj = meniJed;
                        let appears = false;
                        let jedID = meniJed._id.toString();
                        gostJedi.forEach((gostJed) => {
                            let gostJedId = gostJed._id.toString();
                            if (jedID === gostJedId) {
                                appears = true;
                            }
                        })
                        if (!appears) {
                            obj.ocenjena = false;
                        }
                        else {
                            obj.ocenjena = true;
                        }
                        meniRenderData.push(obj);
                    })
                }
            }
            else {
                meniRenderData = meni;
            }
            resolve(meniRenderData);
        }catch (err) {
            reject (err);
        }
    })
}

module.exports = {
    pridobiMeni
}

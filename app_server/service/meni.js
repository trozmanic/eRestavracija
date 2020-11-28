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
function prepareData(dish){
    var api_dish = {};
    var food_api = false;
    if(dish.hasOwnProperty('id')){
        api_dish.id = dish.id;
    }
    if(!dish.hasOwnProperty('kalorije') || dish.kalorije <= 0){
        food_api = true;
        api_dish.kalorije = 0;
    }
    for(let key in dish){

        // to do make food api request
        api_dish[key] = dish[key];
    }



    return api_dish;
}

const editMeni =  async function(req, res){
    var dish = req.body;

    axios.put(apiParametri.streznik + '/api/meni/'+req.query.id, prepareData(dish))
        .then((api_res) => {
            return res.status(200).json(api_res.body);
    }).catch((err)=> {
            return res.status(500).json({"error_message": err})
    });
}
const addDish = async function(req, res){
    var dish = req.body;

    axios.post(apiParametri.streznik + '/api/meni', prepareData(dish))
        .then((api_res) => {
            return res.status(200).json(api_res.body);
        }).catch((err)=> {
        return res.status(500).json({"error_message": err})
    });
}

module.exports = {
    pridobiMeni,
    editMeni,
    addDish
}

const axios = require('axios');
const apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://aldente-sp-20-21.herokuapp.com';
}

const foodApiId = "fe73ca9c";
const foodApiKey = "8ec65cd0e8152767e4be9e21f92d0610";

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

function foodApiRequest(sestavina, kolicina){
    return new Promise(resolve => {
        axios.get('https://api.edamam.com/api/food-database/v2/parser?ingr='+sestavina+'&app_id=' + foodApiId + '&app_key=' + foodApiKey)
            .then((response) => {
                console.log(response.data);
                if(response.data.parsed[0] === undefined){
                    resolve(0);
                }
                resolve(parseInt(kolicina) * ((parseFloat(response.data.parsed[0].food.nutrients.ENERC_KCAL)) / 100.0));

            }).catch((err) => {
            console.log(err);
        });
    });
}

async function prepareData(dish){
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

        if(key === 'sestavine'){
            api_dish.sestavine = [];


            for(var i = 0; i < dish[key].length; i++){
                if(food_api) {

                    var sestavina = dish[key][i]['sestavina'];
                    sestavina = sestavina.replace(/ /g, '%20');
                    var kolicina = dish[key][i]['kolicina'];

                    api_dish.kalorije = parseInt(api_dish.kalorije) + parseInt(await foodApiRequest(sestavina, kolicina));

                }
                api_dish.sestavine.push({
                    sestavina: dish[key][i]['sestavina'],
                    kolicina: 1
                })
            }
        }else {
            api_dish[key] = dish[key];
        }
    }



    return api_dish;
}

const editMeni =  async function(req, res){
    var dish = req.body;
    var data = await prepareData(dish);
    axios.put(apiParametri.streznik + '/api/meni/'+req.query.id, data)
        .then((api_res) => {
            return res.status(200).json(api_res.body);
    }).catch((err)=> {
            return res.status(500).json({"error_message": err})
    });
}
const addDish = async function(req, res){
    var dish = req.body;
    var data = await prepareData(dish);
    axios.post(apiParametri.streznik + '/api/meni', data)
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

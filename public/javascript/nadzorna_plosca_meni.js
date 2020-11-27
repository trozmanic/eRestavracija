
function init(){


    const editBtns = document.getElementsByClassName("edit");
    const delBtns = document.getElementsByClassName("delete");

    const add = document.getElementById("dodaj")

    var formActive = false;


    add.addEventListener('click', function (event){
        if(formActive){
            alert("Samo ena jed se lahko dodaja/ureja na enkrat.");
        }else{
            var pointer = 0;
            var div = add.parentNode.parentElement;
            var sestavine = {};
            formActive = true;
            const values = {
                ime: "",
                cena: "",
                kalorije: "",
                opis: ""
            };

            appendForm(div, values);

            document.getElementById("discard").addEventListener('click', () =>{
                location.reload();
            });
            document.getElementById("save").addEventListener('click', () => {
                sestavine_send = [];

                for(let k in sestavine){
                    sestavine_send.push(sestavine[k]);
                }
                const item = {
                    ime: document.getElementById("name").value,
                    opis: document.getElementById("description").value,
                    cena: document.getElementById("price").value,
                    kalorije: document.getElementById("calories").value,
                    sestavine: sestavine_send
                }

                if(document.getElementById("image").files.length > 0){

                    var file = document.getElementById("image").files[0];
                    let image = new FormData();
                    image.append('image', file);
                    axios.post('/api/image',image, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': `multipart/form-data`,
                        }
                    }).then(function (response) {
                        var string = response.data.image.replaceAll('\\', '/');
                        string = string.replace('public', '');
                        item.slika = string;
                        axios.post('/nadzorna_plosca/meni', item)
                            .then(res => {
                                if(res.status == 200){
                                    location.reload();
                                }
                            });
                    })
                }else{
                    axios.post('/nadzorna_plosca/meni', item)
                        .then(res => {
                            if(res.status == 200){
                                location.reload();
                            }
                        });
                }

            });

            document.getElementById("add-sestavina").addEventListener('click',() =>{
                var sestavina = document.getElementById("ingredient").value;
                var kolicina = document.getElementById("quantity").value;
                if(sestavina != null && kolicina != null){
                    var localPointer = pointer;
                    pointer++;
                    sestavine[localPointer] = {
                        sestavina: sestavina,
                        kolicina: kolicina
                    };
                    var ingr = document.createElement('div');
                    ingr.innerHTML = "<p>"+sestavina+" "+kolicina+"<i role=\"button\" class=\"fas fa-ban ikone-stil-posamezna\"></i></p>";
                    ingr.getElementsByTagName("i")[0].addEventListener('click', () => {
                        delete sestavine[localPointer];
                        ingr.remove();
                    });
                }

                document.getElementsByClassName("sestavine")[0].appendChild(ingr);
                document.getElementsByClassName('sestavine')[0].innerHTML;
                document.getElementById("ingredient").value = '';
                document.getElementById("quantity").value = '';
            });
        }
    });

    //console.log(editBtns);
    //console.log(delBtns);


    for(const edit of editBtns){
        edit.addEventListener('click', function (event){
           console.log("Editttt");

           if(formActive){
               alert("Samo ena jed se lahko dodaja/ureja na enkrat.");
           }else{

               var pointer = 0;
               var sestavine = {};
               var div = edit.parentNode.parentElement;
               var ime = div.getElementsByTagName("ime")[0].innerHTML;
               var cena = div.getElementsByTagName("cena")[0].innerHTML;
               var kalorije = div.getElementsByTagName("kalorije")[0].innerHTML;
               var opis = div.getElementsByTagName("opis")[0].innerHTML;
               const values = {
                   ime: ime,
                   cena: cena,
                   kalorije: kalorije,
                   opis: opis
               };

               var id = div.id;


               formActive = true;


               appendForm(div, values);

               document.getElementById("discard").addEventListener('click', () =>{
                  location.reload();
               });
               document.getElementById("save").addEventListener('click', () => {

                   sestavine_send = [];

                   for(let k in sestavine){
                       sestavine_send.push(sestavine[k]);
                   }
                   const item = {
                       id: id,
                       ime: document.getElementById("name").value,
                       opis: document.getElementById("description").value,
                       cena: document.getElementById("price").value,
                       kalorije: document.getElementById("calories").value,
                       sestavine: sestavine_send
                   }

                   if(document.getElementById("image").files.length > 0){

                       var file = document.getElementById("image").files[0];
                       let image = new FormData();
                       image.append('image', file);
                       axios.post('/api/image',image, {
                           headers: {
                               'accept': 'application/json',
                               'Accept-Language': 'en-US,en;q=0.8',
                               'Content-Type': `multipart/form-data`,
                           }
                       }).then(function (response) {
                           var string = response.data.image.replaceAll('\\', '/');
                           string = string.replace('public', '');
                           item.slika = string;
                           axios.put('/nadzorna_plosca/meni/'+id, item)
                               .then(res => {
                                   if(res.status == 200){
                                       location.reload();
                                   }
                               });
                       })
                   }else{
                       axios.put('/nadzorna_plosca/meni/'+id, item)
                           .then(res => {
                               if(res.status == 200){
                                   location.reload();
                               }
                           });
                   }



               });

               document.getElementById("add-sestavina").addEventListener('click',() =>{
                   var sestavina = document.getElementById("ingredient").value;
                   var kolicina = document.getElementById("quantity").value;
                   if(sestavina != null && kolicina != null){
                       var localPointer = pointer;
                       pointer++;
                       sestavine[localPointer] = {
                           sestavina: sestavina,
                           kolicina: kolicina
                       };
                       var ingr = document.createElement('div');
                       ingr.innerHTML = "<p>"+sestavina+" "+kolicina+"<i role=\"button\" class=\"fas fa-ban ikone-stil-posamezna\"></i></p>";
                       ingr.getElementsByTagName("i")[0].addEventListener('click', () => {
                           delete sestavine[localPointer];
                           ingr.remove();
                       });
                   }

                   document.getElementsByClassName("sestavine")[0].appendChild(ingr);
                   document.getElementsByClassName('sestavine')[0].innerHTML;
                   document.getElementById("ingredient").value = '';
                   document.getElementById("quantity").value = '';
               });
           }

        });
    }

    for(const del of delBtns){
        del.addEventListener('click', function (event){
            var id = del.parentNode.parentElement.id;
            sendDelete(id);
        })
    }

}




function sendDelete(id){
    //var xhttp = new XMLHttpRequest();
    //xhttp.open('DELETE', '')
    axios.delete('/api/meni/'+id)
        .then(res => {
           if(res.status == 200){
               location.reload();
           }
        });
}

function appendForm(element, value){

    element.style.display = "none";
    var div = document.createElement('div');
    div.classList = "rezervacija-skatla";

    var form =
        "    <form method=\"post\">\n" +
        "        <div class=\"form-group\">\n" +
        "            <label style=\"color: white\">Ime</label>\n" +
        "            <input type=\"text\" id=\"name\" name=\"name\" value=\""+value.ime+"\">\n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
        "            <label>Opis</label>\n" +
        "            <textarea  name=\"description\" id=\"description\" class=\"form-control form-control-lg mb-3\" rows=\"3\">"+value.opis+"</textarea>\n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
        "            <label>Cena</label>\n" +
        "            <input type=\"text\" id=\"price\" name=\"price\" value=\""+value.cena+"\" >\n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
        "            <label>Kalorije</label>\n" +
        "            <input type=\"text\" id=\"calories\" name=\"calories\" value=\""+value.kalorije+"\">\n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
        "            <label>Food API</label>\n" +
        "            <input type=\"text\" id=\"ingredient\" placeholder=\"Vnesi sestavino\">\n" +
        "            <input type=\"text\" id=\"quantity\" placeholder=\"Vnesi količino\">\n" +
        "            <i role=\"button\" id=\"add-sestavina\" class=\"fas fa-search ikone-stil-posamezna\"></i>\n" +
        "        </div>\n" +
        "       <div class=\"sestavine\">" +
        "       </div>" +
        "        <div class=\"custom-file\">\n" +
        "            <input id='image' type=\"file\" class=\"custom-file-input\"\n" +
        "                   aria-describedby=\"inputGroupFileAddon01\">\n" +
        "            <label class=\"custom-file-label\" for=\"inputGroupFile01\">Izberi sliko</label>\n" +
        "        </div>\n" +
        "        <div class=\"form-group gor-margin\">\n" +
        "                    <div class=\"ikone-stil\">\n" +
        "                        <button type=\"button\" id=\"discard\" class=\"btn btn-dark\"><i class=\"fas fa-trash-alt\"></i></button>\n" +
        "                        <button type=\"button\" id=\"save\" class=\"btn btn-dark btn-block\"><i class=\"fas fa-save\"></i> SHRANI</button>\n" +
        "                    </div>\n" +
        "        </div>\n" +
        "        <br>\n" +
        "    </form>\n"
    div.innerHTML = form
    element.parentNode.insertBefore(div, element.nextSibling);
}
window.onload = init;



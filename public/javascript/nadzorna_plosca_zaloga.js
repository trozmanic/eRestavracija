var gumbUredi = document.getElementById("uredi");
var steviloVrsticNaZacetku = 0;
var gumbPotrdiUrejanje = 0;
var gumbPotrdiDodajanje = 0;

//Najdi vrednosti izbranega checkboxa
gumbUredi.addEventListener("click", function(){
    
    var oznaceni = document.querySelectorAll("input:checked");
    
    var vrstica = oznaceni[0].parentElement.parentElement.parentElement;
    var sestavina = vrstica.getElementsByTagName("td")[0].innerHTML;
    var kolicina = vrstica.getElementsByTagName("td")[1].innerHTML;
    
    document.getElementById("SestavinaForm2").placeholder = sestavina;
    document.getElementById("KolicinaForm2").placeholder = kolicina;
});

//Preveri koliko checkboxov je obkljukanih in omogoči oziroma onemogoči gumba uredi ter izbriši
document.addEventListener("click", function(){
    
    var checkboxi = document.querySelectorAll("input:checked");
    var uredi = document.getElementById("uredi");
    var izbrisi = document.getElementById("izbrisiSestavino");
    
    if (checkboxi.length === 0) {
        uredi.disabled = true;
        izbrisi.disabled = true;
    } else if(checkboxi.length === 1) {
        uredi.disabled = false;
        izbrisi.disabled = false;
    } else {
        uredi.disabled = true;
        izbrisi.disabled = false;
    }
});

//Dodaj vrstico v tabelo
var dodaj = document.getElementById("dodajSestavinoPotrdi");

dodaj.addEventListener("click", function(){
    
    /*
    var tabela = document.getElementById("tabela");
    var vrstica = tabela.getElementsByTagName("tr");
    var vnosSestavine = document.getElementById("")
    
    if(vrstica.length == 1) {
        var telo = tabela.getElementsByTagName("tbody")[0];
        telo.insertAdjacentHTML("afterbegin", "<tbody><tr><th scope='row'><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input' id='customCheck"+steviloVrsticNaZacetku+"'><label class='custom-control-label' for='customCheck"+steviloVrsticNaZacetku+"'></label></div></th><td>"+document.getElementById("SestavinaForm1").value+"</td><td>"+document.getElementById("KolicinaForm1").value+"</td></tr></tbody>");

    }else {
        vrstica[1].insertAdjacentHTML("beforebegin", "<tr><th scope='row'><div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input' id='customCheck"+steviloVrsticNaZacetku+"'><label class='custom-control-label' for='customCheck"+steviloVrsticNaZacetku+"'></label></div></th><td>"+document.getElementById("SestavinaForm1").value+"</td><td>"+document.getElementById("KolicinaForm1").value+"</td></tr>");
    }
    */
    
    document.getElementById("SestavinaForm1").value = "";
    document.getElementById("KolicinaForm1").value = "";
    
    steviloVrsticNaZacetku++;
});

//Uredi izbrano vrstico
var uredi = document.getElementById("urediSestavinoPotrdi");

uredi.addEventListener("click", function(){
    
    var tabela = document.getElementById("tabela");
    var checkboxi = tabela.getElementsByTagName("input");
    var vrstice = tabela.getElementsByTagName("tr");
    var steviloVrstic = vrstice.length-1;
    var sestavina = document.getElementById("SestavinaForm2").value;
    var kolicina = document.getElementById("KolicinaForm2").value;
    
    if(steviloVrstic <= 1) {
        if(checkboxi[0].checked) {
            var podatki = vrstice[1].getElementsByTagName("td");
            console.log(podatki);
            podatki[0].innerHTML = sestavina;
            podatki[1].innerHTML = kolicina;
            checkboxi[0].checked = false;
        }
    } else {
        for(var i=1; i<steviloVrstic; i++){
            if(checkboxi[i-1].checked) {
                var podatki = vrstice[i].getElementsByTagName("td");
                podatki[0].innerHTML = sestavina;
                podatki[1].innerHTML = kolicina;
                checkboxi[i-1].checked = false;
            }
        }
    }
    
    document.getElementById("SestavinaForm2").value = "";
    document.getElementById("KolicinaForm2").value = "";
});

//Izbriši vnosna polja pri urejanju sestavine, če kliknemo gumb Prekliči
var preklici = document.getElementById("urediSestavinoPreklici");
preklici.addEventListener("click", function() {
    var vnesiSestavino = document.getElementById("SestavinaForm2");
    var vnesiKolicino = document.getElementById("KolicinaForm2");
    vnesiSestavino.value = "";
    vnesiKolicino.value = "";
    vnesiSestavino.classList.add("is-invalid");
    vnesiSestavino.classList.remove("is-valid");
    vnesiKolicino.classList.add("is-invalid");
    vnesiKolicino.classList.remove("is-valid");
})

//Izbrisi vse izbrane vrstice
var gumbPotrdi = document.getElementById("izbrisiSestavinoPotrdi");

gumbPotrdi.addEventListener("click", function(){
    
    var tabela = document.getElementById("tabela");
    var checkboxi = tabela.getElementsByTagName("input");
    var vrstice = tabela.getElementsByTagName("tr");
    var steviloVrstic = vrstice.length-1;
    
    if(steviloVrstic <= 1) {
        if(checkboxi[0].checked) {
            tabela.deleteRow(1);
        }
    } else {
        for(var i=1; i<steviloVrstic; i++){
            if(checkboxi[i-1].checked) {
                tabela.deleteRow(i);
                i = 0;
                steviloVrstic--;
            }
        }
    }
});

//Prekliči brisanje vseh izbranih vrstic
var gumbPreklici = document.getElementById("izbrisiSestavinoPreklici");

gumbPreklici.addEventListener("click", function(){
    
    var tabela = document.getElementById("tabela");
    var checkboxi = tabela.getElementsByTagName("input");
    var steviloVrstic = checkboxi.length;
    
    for(var i=0; i<steviloVrstic; i++){
        console.log(checkboxi[i]);
        if(checkboxi[i].checked) {
            checkboxi[i].checked = false;
        }
    }
});

//Preveri, če je vnos sestavine pravilen
var vnosSestavine = document.getElementById("SestavinaForm2");

vnosSestavine.addEventListener("input", function(){
    var reg = new RegExp("^[a-žA-Ž]{3,}[a-žA-Ž]*.?[a-žA-Ž]*$");
    var sestavina = vnosSestavine.value;
    var gumbPotrdi = document.getElementById("urediSestavinoPotrdi");
    var vnosnoPolje = document.getElementById("SestavinaForm2");
    
    if(reg.test(sestavina)){
        gumbPotrdi.disabled = false;
        vnosnoPolje.setCustomValidity("");
        vnosnoPolje.classList.remove("is-invalid");
        vnosnoPolje.classList.add("is-valid");
    } else {
        gumbPotrdi.disabled = true;
        vnosnoPolje.setCustomValidity("Nepravilen vnos!");
        vnosnoPolje.classList.remove("is-valid");
        vnosnoPolje.classList.add("is-invalid");
    }
});

//Preveri, če je vnos količine pravilen
var vnosKolicine = document.getElementById("KolicinaForm2");

vnosKolicine.addEventListener("input", function(){
    var reg = new RegExp("^[0-9]+.?[a-žA-Ž]{1,5}$");
    var kolicina = vnosKolicine.value;
    var gumbPotrdi = document.getElementById("urediSestavinoPotrdi");
    var vnosnoPolje = document.getElementById("KolicinaForm2");
    
    if(reg.test(kolicina)){
        gumbPotrdi.disabled = false;
        vnosnoPolje.setCustomValidity("");
        vnosnoPolje.classList.remove("is-invalid");
        vnosnoPolje.classList.add("is-valid");
    } else {
        gumbPotrdi.disabled = true;
        vnosnoPolje.setCustomValidity("Nepravilen vnos!");
        vnosnoPolje.classList.remove("is-valid");
        vnosnoPolje.classList.add("is-invalid");
    }
});

//Ko odpremo modal window se focusiramo na prvo vnosno polje
$("#SestavinaModal1").on("shown.bs.modal", function () {
    $("#SestavinaForm1").focus();
})

$("#SestavinaModal2").on("shown.bs.modal", function () {
    $("#SestavinaForm2").focus();
})
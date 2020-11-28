var gumbUredi = document.getElementById("uredi");
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

//Dodaj sestavino
var dodaj = document.getElementById("dodajSestavinoPotrdi");

dodaj.addEventListener("click", function(){
    
    var ime = document.getElementById("SestavinaForm1").value;
    var kolicinaEnota = document.getElementById("KolicinaForm1").value;
    var cena = parseInt(document.getElementById("CenaForm1").value);
    var razdeli = kolicinaEnota.split(" ");
    var kolicina = parseInt(razdeli[0]);
    var enota = razdeli[1];
    
    var novaSestavina = {ime:ime, kolicina:kolicina, enota:enota, cena:cena};
    
    /*console.log(JSON.stringify(novaSestavina));
    
    $.post("/api/zaloga", novaSestavina, function(data, status, jqXHR) {
        console.log("Status: "+status+", podatki: " + data);
	});
	*/
	
	$.ajax({
        url: '/api/zaloga/',
        type: 'POST',
        data: novaSestavina,
        success: function(odgovor) {
            console.log("Odgovor: "+odgovor);
            document.getElementById("SestavinaForm1").value = "";
            document.getElementById("KolicinaForm1").value = "";
            document.getElementById("CenaForm1").value = "";
            location.reload();
        }
    });
});

//Uredi izbrano sestavino
var uredi = document.getElementById("urediSestavinoPotrdi");

uredi.addEventListener("click", function(){
    
    var tabela = document.getElementById("tabela");
    var checkboxi = tabela.getElementsByTagName("input");
    var vrstice = tabela.getElementsByTagName("tr");
    var steviloVrstic = vrstice.length-1;
    var ime = document.getElementById("SestavinaForm2").value;
    var kolicinaEnota = document.getElementById("KolicinaForm2").value;
    var cena = parseInt(document.getElementById("CenaForm2").value);
    var razdeli = kolicinaEnota.split(" ");
    var kolicina = parseInt(razdeli[0]);
    var enota = razdeli[1];
    
    for(var i=0; i<steviloVrstic; i++){
        if(checkboxi[i].checked) {
            var id = checkboxi[i].getAttribute("idsestavine");
            var posodobljenaSestavina = {id:id};
            if(ime != ""){
                posodobljenaSestavina.ime = ime;
            }
            if(kolicina >= 0){
                posodobljenaSestavina.kolicina = kolicina;
            }
            if(enota != undefined){
                posodobljenaSestavina.enota = enota;
            }
            if(cena >= 0){
                posodobljenaSestavina.cena = cena;
            }
            
            $.ajax({
                url: '/api/zaloga/',
                type: 'PUT',
                data: posodobljenaSestavina,
                success: function(odgovor) {
                    console.log("Odgovor: "+odgovor);
                    document.getElementById("SestavinaForm2").value = "";
                    document.getElementById("KolicinaForm2").value = "";
                    document.getElementById("CenaForm2").value = "";
                    location.reload();
                }
            });
        }
    }
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
    
    for(var i=0; i<steviloVrstic; i++){
        if(checkboxi[i].checked) {
            var id = checkboxi[i].getAttribute("idsestavine");
            $.ajax({
                url: '/api/zaloga/'+id,
                type: 'DELETE',
                success: function(odgovor) {
                    console.log("Odgovor: "+odgovor);
                    location.reload();
                }
            });
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

//Preveri, če je vnos sestavine pravilen Modal DODAJ
var vnosSestavine1 = document.getElementById("SestavinaForm1");

vnosSestavine1.addEventListener("input", function(){
    var reg = new RegExp("^[a-žA-Ž]{3,}[a-žA-Ž]*.?[a-žA-Ž]*$");
    var sestavina = vnosSestavine1.value;
    var gumbPotrdi = document.getElementById("dodajSestavinoPotrdi");
    var vnosnoPolje = document.getElementById("SestavinaForm1");
    
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

//Preveri, če je vnos količine pravilen Modal DODAJ
var vnosKolicine1 = document.getElementById("KolicinaForm1");

vnosKolicine1.addEventListener("input", function(){
    var reg = new RegExp("^[0-9]+.?[a-žA-Ž]{1,5}$");
    var kolicina = vnosKolicine1.value;
    var gumbPotrdi = document.getElementById("dodajSestavinoPotrdi");
    var vnosnoPolje = document.getElementById("KolicinaForm1");
    
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

//Preveri, če je vnos cene pravilen Modal DODAJ
var vnosCene1 = document.getElementById("CenaForm1");

vnosCene1.addEventListener("input", function(){
    var reg = new RegExp("^[0-9]*.[0-9]*$");
    var kolicina = vnosCene1.value;
    var gumbPotrdi = document.getElementById("dodajSestavinoPotrdi");
    var vnosnoPolje = document.getElementById("CenaForm1");
    
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

//Preveri, če je vnos sestavine pravilen Modal UREDI
var vnosSestavine2 = document.getElementById("SestavinaForm2");

vnosSestavine2.addEventListener("input", function(){
    var reg = new RegExp("^[a-žA-Ž]{3,}[a-žA-Ž]*.?[a-žA-Ž]*$");
    var sestavina = vnosSestavine2.value;
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

//Preveri, če je vnos količine pravilen Modal UREDI
var vnosKolicine2 = document.getElementById("KolicinaForm2");

vnosKolicine2.addEventListener("input", function(){
    var reg = new RegExp("^[0-9]+.?[a-žA-Ž]{1,5}$");
    var kolicina = vnosKolicine2.value;
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

//Preveri, če je vnos cene pravilen Modal UREDI
var vnosCene2 = document.getElementById("CenaForm2");

vnosCene2.addEventListener("input", function(){
    var reg = new RegExp("^[0-9]*.[0-9]*$");
    var kolicina = vnosCene2.value;
    var gumbPotrdi = document.getElementById("urediSestavinoPotrdi");
    var vnosnoPolje = document.getElementById("CenaForm2");
    
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
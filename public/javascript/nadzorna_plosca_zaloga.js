var preveriIme;
var preveriKolicino;
var preveriCeno;

//Ko odpremo modal window se focusiramo na prvo vnosno polje
$(document).ready(function(){
    $("#SestavinaModal1").on('shown.bs.modal', function(){
        $(this).find('#SestavinaForm1').focus();
    });
    $("#SestavinaModal2").on("shown.bs.modal", function () {
        $(this).find('#SestavinaForm2').focus();
    })
    
    preveriIme = false;
    preveriKolicino = false;
    preveriCeno = false;
});

//Najdi vrednosti izbranega checkboxa
var gumbUredi = document.getElementById("uredi");

gumbUredi.addEventListener("click", function(){
    
    var oznaceni = document.querySelectorAll("input:checked");
    
    var vrstica = oznaceni[0].parentElement.parentElement.parentElement;
    var sestavina = vrstica.getElementsByTagName("td")[0].innerHTML;
    var kolicina = vrstica.getElementsByTagName("td")[1].innerHTML;
    var cena = vrstica.getElementsByTagName("td")[2].innerHTML;
    
    document.getElementById("SestavinaForm2").placeholder = sestavina;
    document.getElementById("KolicinaForm2").placeholder = kolicina;
    document.getElementById("CenaForm2").placeholder = cena;
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

//Izbriši vnosna polja pri dodajanju sestavine, če kliknemo gumb Prekliči
var prekliciDodajanje = document.getElementById("dodajSestavinoPreklici");
prekliciDodajanje.addEventListener("click", function() {
    var vnesiSestavino = document.getElementById("SestavinaForm1");
    var vnesiKolicino = document.getElementById("KolicinaForm1");
    vnesiSestavino.value = "";
    vnesiKolicino.value = "";
    vnesiSestavino.classList.add("is-invalid");
    vnesiSestavino.classList.remove("is-valid");
    vnesiKolicino.classList.add("is-invalid");
    vnesiKolicino.classList.remove("is-valid");
});

//Izbriši vnosna polja pri urejanju sestavine, če kliknemo gumb Prekliči
var prekliciUrejanje = document.getElementById("urediSestavinoPreklici");
prekliciUrejanje.addEventListener("click", function() {
    var vnesiSestavino = document.getElementById("SestavinaForm2");
    var vnesiKolicino = document.getElementById("KolicinaForm2");
    vnesiSestavino.value = "";
    vnesiKolicino.value = "";
    vnesiSestavino.classList.add("is-invalid");
    vnesiSestavino.classList.remove("is-valid");
    vnesiKolicino.classList.add("is-invalid");
    vnesiKolicino.classList.remove("is-valid");
});

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
        preveriIme = true;
        if(preveriCeno && preveriKolicino){
            gumbPotrdi.disabled = false;
        }
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
    var reg = new RegExp("^[0-9]*.[0-9]*.?[a-žA-Ž]{1,5}$");
    var kolicina = vnosKolicine1.value;
    var gumbPotrdi = document.getElementById("dodajSestavinoPotrdi");
    var vnosnoPolje = document.getElementById("KolicinaForm1");
    
    if(reg.test(kolicina)){
        preveriKolicino = true;
        if(preveriIme && preveriCeno){
            gumbPotrdi.disabled = false;
        }
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
    var cena = vnosCene1.value;
    var gumbPotrdi = document.getElementById("dodajSestavinoPotrdi");
    var vnosnoPolje = document.getElementById("CenaForm1");
    
    if(reg.test(cena)){
        preveriCeno = true;
        if(preveriIme && preveriKolicino){
            gumbPotrdi.disabled = false;
        }
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
    var reg = new RegExp("^[0-9]*.[0-9]*.?[a-žA-Ž]{1,5}$");
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


//Iskanje po tabeli
var iskanje = document.getElementById("IskanjePoZalogi");

iskanje.addEventListener("keyup", function (){
  // Declare variables
  var td, i, iskalnaVrednost, tdVrednost;
  
  var filter = iskanje.value.toUpperCase();
  var tabela = document.getElementById("tabela");
  var tr = tabela.getElementsByTagName("tr");
  var iskanjePo = document.getElementById("iskanjePo");
  iskanjePo = iskanjePo.options[iskanjePo.selectedIndex].text;
  
  for (i = 1; i < tr.length; i++) {
      for(var j = 0; j < 3; j++){
          td = tr[i].getElementsByTagName("td")[j];
          tdVrednost = td.getAttribute("iskanje");
          if(tdVrednost === iskanjePo){
              break;
          }
      }
    if (td) {
      iskalnaVrednost = td.textContent || td.innerText;
      if (iskalnaVrednost.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});
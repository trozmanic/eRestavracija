var preveriIme;
var preveriPosto;
var preveriTelefon;
var preveriGeslo;
var preveriVlogo;
    
//Ko odpremo modal window se focusiramo na prvo vnosno polje
$(document).ready(function(){
    $("#ZaposlenModal1").on('shown.bs.modal', function(){
        $(this).find('#ImeForm1').focus();
    });
    $("#ZaposlenModal2").on("shown.bs.modal", function () {
        $(this).find('#ImeForm2').focus();
    })
    preveriIme = false;
    preveriPosto = false;
    preveriTelefon = false;
    preveriGeslo = false;
    preveriVlogo = false;
});

//Najdi vrednosti izbranega checkboxa
var gumbUredi = document.getElementById("uredi");

gumbUredi.addEventListener("click", function(){
    
    var oznaceni = document.querySelectorAll("input:checked");
    
    var vrstica = oznaceni[0].parentElement.parentElement.parentElement;
    var ime = vrstica.getElementsByTagName("td")[0].innerHTML;
    var posta = vrstica.getElementsByTagName("td")[1].innerHTML;
    var telefon = vrstica.getElementsByTagName("td")[2].innerHTML;
    
    document.getElementById("ImeForm2").placeholder = ime;
    document.getElementById("PostaForm2").placeholder = posta;
    document.getElementById("TelefonForm2").placeholder = telefon;
});

//Preveri koliko checkboxov je obkljukanih in omogoči oziroma onemogoči gumba uredi ter izbriši
document.addEventListener("click", function(){
    
    var checkboxi = document.querySelectorAll("input:checked");
    var uredi = document.getElementById("uredi");
    var izbrisi = document.getElementById("izbrisiZaposlenega");
    
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

//Dodaj zaposlenega
var dodaj = document.getElementById("dodajZaposlenegaPotrdi");

dodaj.addEventListener("click", function(){
    
    var ime = document.getElementById("ImeForm1").value;
    var posta = document.getElementById("PostaForm1").value;
    var telefon = document.getElementById("TelefonForm1").value;
    var geslo = document.getElementById("GesloForm1").value;
    var vloga = document.getElementById("VlogaForm1");
    var izbranaVloga = vloga.options[vloga.selectedIndex].text;
    
    var novZaposlen = {ime:ime, email_naslov:posta, telefonska_stevilka:telefon, geslo:geslo, vloga:izbranaVloga};
	
	$.ajax({
        url: '/api/uporabniki/',
        type: 'POST',
        data: novZaposlen,
        success: function(odgovor) {
            console.log("Odgovor: "+odgovor);
            document.getElementById("ImeForm1").value = "";
            document.getElementById("PostaForm1").value = "";
            document.getElementById("TelefonForm1").value = "";
            document.getElementById("GesloForm1").value = "";
            location.reload();
        }
    });
});

//Uredi izbranega zaposlenega
var uredi = document.getElementById("urediZaposlenegaPotrdi");

uredi.addEventListener("click", function(){
    
    var tabela = document.getElementById("tabela");
    var checkboxi = tabela.getElementsByTagName("input");
    var vrstice = tabela.getElementsByTagName("tr");
    var steviloVrstic = vrstice.length-1;
    
    var ime = document.getElementById("ImeForm2").value;
    var posta = document.getElementById("PostaForm2").value;
    var telefon = document.getElementById("TelefonForm2").value;
    var geslo = document.getElementById("GesloForm2").value;
    var vloga = document.getElementById("VlogaForm2");
    var izbranaVloga = vloga.options[vloga.selectedIndex].text; 
    
    for(var i=0; i<steviloVrstic; i++){
        if(checkboxi[i].checked) {
            var id = checkboxi[i].getAttribute("idzaposlenega");
            var posodobljenZaposlen = {id:id};
            if(ime != ""){
                posodobljenZaposlen.ime = ime;
            }
            if(posta != ""){
                posodobljenZaposlen.email_naslov = posta;
            }
            if(telefon != ""){
                posodobljenZaposlen.telefonska_stevilka = telefon;
            }
            if(geslo != ""){
                posodobljenZaposlen.geslo = geslo;
            }
            if(vloga != ""){
                posodobljenZaposlen.vloga = vloga;
            }
            
            $.ajax({
                url: '/api/uporabniki/',
                type: 'PUT',
                data: posodobljenZaposlen,
                success: function(odgovor) {
                    console.log("Odgovor: "+odgovor);
                    document.getElementById("ImeForm2").value = "";
                    document.getElementById("PostaForm2").value = "";
                    document.getElementById("TelefonForm2").value = "";
                    document.getElementById("GesloForm2").value = "";
                    location.reload();
                }
            });
        }
    }
});

//Izbrisi vse izbrane vrstice
var gumbPotrdi = document.getElementById("izbrisiZaposlenegaPotrdi");

gumbPotrdi.addEventListener("click", function(){
    
    var tabela = document.getElementById("tabela");
    var checkboxi = tabela.getElementsByTagName("input");
    var vrstice = tabela.getElementsByTagName("tr");
    var steviloVrstic = vrstice.length-1;
    
    for(var i=0; i<steviloVrstic; i++){
        if(checkboxi[i].checked) {
            var id = checkboxi[i].getAttribute("idzaposlenega");
            $.ajax({
                url: '/api/uporabniki/'+id,
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
var gumbPreklici = document.getElementById("izbrisiZaposlenegaPreklici");

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

//Izbriši vnosna polja pri urejanju zaposlenega, če kliknemo gumb Prekliči
var prekliciDodajanje = document.getElementById("dodajZaposlenegaPreklici");
prekliciDodajanje.addEventListener("click", function() {
    var ime = document.getElementById("ImeForm1");
    var posta = document.getElementById("PostaForm1");
    var telefon = document.getElementById("TelefonForm1");
    var geslo = document.getElementById("GesloForm1");
    var vloga = document.getElementById("VlogaForm1");
    
    ime.value = "";
    posta.value = "";
    telefon.value = "";
    geslo.value = "";
    vloga.value = "";
    
    ime.classList.add("is-invalid");
    ime.classList.remove("is-valid");
    posta.classList.add("is-invalid");
    posta.classList.remove("is-valid");
    telefon.classList.add("is-invalid");
    telefon.classList.remove("is-valid");
    geslo.classList.add("is-invalid");
    geslo.classList.remove("is-valid");
    vloga.classList.add("is-invalid");
    vloga.classList.remove("is-valid");
});

//Izbriši vnosna polja pri urejanju zaposlenega, če kliknemo gumb Prekliči
var prekliciUrejanje = document.getElementById("urediZaposlenegaPreklici");
prekliciUrejanje.addEventListener("click", function() {
    var ime = document.getElementById("ImeForm2");
    var posta = document.getElementById("PostaForm2");
    var telefon = document.getElementById("TelefonForm2");
    var geslo = document.getElementById("GesloForm2");
    var vloga = document.getElementById("VlogaForm2");
    
    ime.value = "";
    posta.value = "";
    telefon.value = "";
    geslo.value = "";
    vloga.value = "";
    
    ime.classList.add("is-invalid");
    ime.classList.remove("is-valid");
    posta.classList.add("is-invalid");
    posta.classList.remove("is-valid");
    telefon.classList.add("is-invalid");
    telefon.classList.remove("is-valid");
    geslo.classList.add("is-invalid");
    geslo.classList.remove("is-valid");
    vloga.classList.add("is-invalid");
    vloga.classList.remove("is-valid");
});

//Preveri, če je vnos imena zaposlenega pravilen Modal DODAJ
var vnosImena1 = document.getElementById("ImeForm1");

vnosImena1.addEventListener("input", function(){
    var reg = new RegExp("^[a-žA-Ž]{3,}[a-žA-Ž]*.?[a-žA-Ž]*$");
    var ime = vnosImena1.value;
    var gumbPotrdi = document.getElementById("dodajZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("ImeForm1");
    
    if(reg.test(ime)){
        preveriIme = true;
        if(preveriVlogo && preveriPosto && preveriTelefon && preveriGeslo){
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

//Preveri, če je vnos pošte pravilen Modal DODAJ
var vnosPoste1 = document.getElementById("PostaForm1");

vnosPoste1.addEventListener("input", function(){
    var reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var posta = vnosPoste1.value;
    var gumbPotrdi = document.getElementById("dodajZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("PostaForm1");
    
    if(reg.test(posta)){
        preveriPosto = true;
        if(preveriIme && preveriVlogo && preveriTelefon && preveriGeslo){
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

//Preveri, če je vnos telefonske številke pravilen Modal DODAJ
var vnosTelefona1 = document.getElementById("TelefonForm1");

vnosTelefona1.addEventListener("input", function(){
    var reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    var telefon = vnosTelefona1.value;
    var gumbPotrdi = document.getElementById("dodajZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("TelefonForm1");
    
    if(reg.test(telefon)){
        preveriTelefon = true;
        if(preveriIme && preveriPosto && preveriVlogo && preveriGeslo){
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

//Preveri, če je vnos gesla pravilen Modal DODAJ
var vnosGesla1 = document.getElementById("GesloForm1");

vnosGesla1.addEventListener("input", function(){
    var reg = /^.*$/;
    var telefon = vnosGesla1.value;
    var gumbPotrdi = document.getElementById("dodajZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("GesloForm1");
    
    if(reg.test(telefon)){
        preveriGeslo = true;
        if(preveriIme && preveriPosto && preveriTelefon && preveriVlogo){
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

//Preveri, če je izbor vloge pravilen Modal DODAJ
var vnosVloge1 = document.getElementById("VlogaForm1");

vnosVloge1.addEventListener("input", function(){
    var vloga = vnosVloge1.value;
    var gumbPotrdi = document.getElementById("dodajZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("VlogaForm1");
    
    if(!vnosVloge1.defaultSelected){
        preveriVlogo = true;
        if(preveriIme && preveriPosto && preveriTelefon && preveriGeslo){
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

//Preveri, če je vnos imena zaposlenega pravilen Modal UREDI
var vnosImena2 = document.getElementById("ImeForm2");

vnosImena2.addEventListener("input", function(){
    var reg = new RegExp("^[a-žA-Ž]{3,}[a-žA-Ž]*.?[a-žA-Ž]*$");
    var ime = vnosImena2.value;
    var gumbPotrdi = document.getElementById("urediZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("ImeForm2");
    
    if(reg.test(ime)){
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

//Preveri, če je vnos pošte pravilen Modal UREDI
var vnosPoste2 = document.getElementById("PostaForm2");

vnosPoste2.addEventListener("input", function(){
    var reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var posta = vnosPoste2.value;
    var gumbPotrdi = document.getElementById("urediZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("PostaForm2");
    
    if(reg.test(posta)){
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

//Preveri, če je vnos telefonske številke pravilen Modal UREDI
var vnosTelefona2 = document.getElementById("TelefonForm2");

vnosTelefona2.addEventListener("input", function(){
    var reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    var telefon = vnosTelefona2.value;
    var gumbPotrdi = document.getElementById("urediZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("TelefonForm2");
    
    if(reg.test(telefon)){
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

//Preveri, če je vnos gesla pravilen Modal UREDI
var vnosGesla2 = document.getElementById("GesloForm2");

vnosGesla2.addEventListener("input", function(){
    var reg = /^.*$/;
    var telefon = vnosGesla2.value;
    var gumbPotrdi = document.getElementById("urediZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("GesloForm2");
    
    if(reg.test(telefon)){
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

//Preveri, če je izbor vloge pravilen Modal UREDI
var vnosVloge2 = document.getElementById("VlogaForm2");

vnosVloge2.addEventListener("input", function(){
    var vloga = vnosVloge2.value;
    var gumbPotrdi = document.getElementById("urediZaposlenegaPotrdi");
    var vnosnoPolje = document.getElementById("VlogaForm2");
    
    if(!vnosVloge2.defaultSelected){
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
var iskanje = document.getElementById("IskanjePoZaposlenih");

iskanje.addEventListener("keyup", function (){
  // Declare variables
  var td, i, iskalnaVrednost, tdVrednost;
  
  var filter = iskanje.value.toUpperCase();
  var tabela = document.getElementById("tabela");
  var tr = tabela.getElementsByTagName("tr");
  var iskanjePo = document.getElementById("iskanjePo");
  iskanjePo = iskanjePo.options[iskanjePo.selectedIndex].text;
  
  for (i = 1; i < tr.length; i++) {
      for(var j = 0; j < 4; j++){
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
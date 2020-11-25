const potrdiRezervacijo = function (dogodek) {
    let id = dogodek.target.closest(".rezervacija-skatla").id;
    console.log(id);
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/api/rezervacija/" + id + "/potrdi");
    xhttp.onload = () => {
        if (xhttp.status == 200) {
            window.alert("Uspešna potrditev");
            window.location.replace("/nadzorna_plosca/rezervacije");
        } else {
            window.alert("Prišlo je do napake: " + JSON.parse(xhttp.responseText).sporocilo);
            window.location.replace("/nadzorna_plosca/rezervacije");
        }
    }
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(null);
}

const zavrniRezervacijo = function (dogodek) {
    let id = dogodek.target.closest(".rezervacija-skatla").id;
    console.log(id);
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/api/rezervacija/" + id + "/zavrni");
    xhttp.onload = () => {
        if (xhttp.status == 200) {
            window.alert("Uspešna zavrnitev");
            window.location.replace("/nadzorna_plosca/rezervacije");
        } else {
            console.log(xhttp.responseText);
            window.alert("Prišlo je do napake: " + JSON.parse(xhttp.responseText).sporocilo);
            window.location.replace("/nadzorna_plosca/rezervacije");
        }
    }
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(null);
}

const povecajNarocilo = function (dogodek) {
    let counter = dogodek.target.parentElement.getElementsByClassName("menicount")[0];
    if (counter.innerHTML < 9) {
        counter.innerHTML = parseInt(counter.innerHTML) + 1;
        izracunajCeno();
    }
}

const zmanjsajNarocilo = function (dogodek) {
    let counter = dogodek.target.parentElement.getElementsByClassName("menicount")[0];
    if (counter.innerHTML > 0) {
        counter.innerHTML = parseInt(counter.innerHTML) - 1;
        izracunajCeno();
    }
}

const posljiNarocilo = function (dogodek) {
    let meni_items = [].reduce.call(document.getElementsByClassName("meniitemflex"), (prev, cur) => {
        if (cur.children[1].innerHTML > 0) {
            prev.push({ meni_item: cur.children[0].id, kolicina: parseInt(cur.children[1].innerHTML) })
        }
        return prev;
    }, [])
    console.log(meni_items);
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/api/narocila/" + id);
    xhttp.onload = () => {
        if (xhttp.status == 200) {
            window.alert("Rezervacija uspešno oddana");
        } else {
            window.alert("Prišlo je do napake");
        }
        window.location.replace("/nadzorna_plosca/rezervacije");
    }
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "$set": { "meni_items": meni_items }
    }));
}

const izracunajCeno = function () {
    let cena = [].reduce.call(document.getElementsByClassName("meniitemflex"), (prev, cur) => {
        return prev+meni_items.find((el)=>el._id==cur.children[0].id).cena*cur.children[1].innerHTML;
    }, 0)
    document.getElementById("vrednostcena").innerHTML=cena+"€";
}

for (let but of document.getElementsByClassName("potrdi_rezervacijo")) {
    but.addEventListener("click", potrdiRezervacijo);
}

for (let but of document.getElementsByClassName("zavrni_rezervacijo")) {
    but.addEventListener("click", zavrniRezervacijo);
}

document.getElementById("narociloposli").addEventListener("click", posljiNarocilo)

let id = "";
let meni_items
let xhttp = new XMLHttpRequest();
xhttp.open("GET", "/api/meni/");
xhttp.onload = () => {
    meni_items = JSON.parse(xhttp.responseText);
}
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send();

$("#dodajnarocilo").on("show.bs.modal", function (e) {
    id = $(e.relatedTarget).data("narocilo");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/narocila/" + id);
    xhttp.onload = () => {
        let narocilo = JSON.parse(xhttp.responseText);
        document.getElementById("meni").innerHTML = "";
        for (let meni_item of meni_items) {
            document.getElementById("meni").innerHTML += '<div class="meniitem"> \
                <div class="meniitemflex"> \
                    <p id='+ meni_item._id + '>' + meni_item.ime + '</p> \
                    <p class="menicount">'+ (narocilo.meni_items.find(el => el.meni_item == meni_item._id) ? narocilo.meni_items.find(el => el.meni_item == meni_item._id).kolicina : 0) + '</p> \
                </div> \
                <i class="fas fa-plus-circle povecajnarocilo"></i> \
                <i class="fas fa-minus-circle zmanjsajnarocilo"></i> \
                </div>';
        }
        document.getElementById("meni").innerHTML +=
            '<div class="meniitem"> \
                <p class="cena">Cena:</p> \
                <p class="cena" id="vrednostcena">20€</p> \
            </div>'

        for (let but of document.getElementsByClassName("povecajnarocilo")) {
            but.addEventListener("click", povecajNarocilo);
        }
        for (let but of document.getElementsByClassName("zmanjsajnarocilo")) {
            but.addEventListener("click", zmanjsajNarocilo);
        }
        izracunajCeno();
    }
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
})


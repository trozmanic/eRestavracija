let klikDodajPlus=function(dogodek){
    let t=dogodek.target.parentElement.getElementsByTagName("p")[0];
    t.innerText=Number(t.innerText)<9 ? Number(t.innerText)+1 : 9;
}

let klikDodajMinus=function(dogodek){
    let t=dogodek.target.parentElement.getElementsByTagName("p")[0];
    t.innerText=Number(t.innerText)>0 ? Number(t.innerText)-1 : 0;
}

let clearStorage=function(){
    let sessionStorage=window.sessionStorage;
    sessionStorage.removeItem("ura");
    sessionStorage.removeItem("stOseb");
    sessionStorage.removeItem("datum");
}

let klikRezerviraj=function(dogodek){
    let jedi=[].slice.call(document.getElementsByClassName("foodCounter")).reduce((res,x)=>{
        if(x.innerText!=0){
            res.push({"meni_item":x.id,"kolicina":Number(x.innerText)})
        }
        return res;
    },[]);
    let sessionStorage=window.sessionStorage;
    let ura=sessionStorage.getItem("ura");
    let stOseb=Number(sessionStorage.getItem("stOseb"));
    let datum=sessionStorage.getItem("datum");
    let datum_in_ura=new Date(datum);
    datum_in_ura.setHours(ura.split(":")[0],ura.split(":")[1]);
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    let payload={
        "datum_in_ura":datum_in_ura.toJSON(),
        "stOseb":stOseb,
        "jedi":jedi,
        "uporabnik_id":credentials.uporabnik_id
    };
    let xhttp=new XMLHttpRequest();
    xhttp.open("POST","/api/rezervacija");
    xhttp.onload=()=>{
        if(xhttp.status==200){
            window.alert("Rezervacija uspešno oddana");
            window.location.replace("/?uporabnik_id="+JSON.parse(localStorage.getItem("credentials")).uporabnik_id);
        }else{
            console.log(xhttp.responseText);
            window.alert("Prišlo je do napake: "+JSON.parse(xhttp.responseText).sporocilo);
            window.location.replace("/?uporabnik_id="+JSON.parse(localStorage.getItem("credentials")).uporabnik_id);
        }
    }
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(payload));
}

let preveriStorage=function(){
    let sessionStorage=window.sessionStorage;
    /*if(window.localStorage.getItem("credentials")==null){
        window.location.replace("/potrebna_prijava");
    }else*/ if(sessionStorage.getItem("ura")==null || sessionStorage.getItem("stOseb")==null || sessionStorage.getItem("datum")==null){
        window.location.replace("/?uporabnik_id="+JSON.parse(localStorage.getItem("credentials")).uporabnik_id);
    }
}

preveriStorage();
for(let but of document.getElementsByClassName("fa-plus")){
    but.addEventListener("click",klikDodajPlus);
}
for(let but of document.getElementsByClassName("fa-minus")){
    but.addEventListener("click",klikDodajMinus);
}
document.getElementById("klikRezerviraj").addEventListener("click",klikRezerviraj);

window.onunload=clearStorage;
let klikDodaj=function(dogodek){
    let t=dogodek.target;
    if(t.classList.contains("but")){
        t.classList.remove("but");
        t.classList.add("but_click");
        t.innerText="Odstrani"
    }else if(t.classList.contains("but_click")){
        t.classList.remove("but_click");
        t.classList.add("but");
        t.innerText="Dodaj"
    }
}

let clearStorage=function(){
    let sessionStorage=window.sessionStorage;
    sessionStorage.removeItem("ura");
    sessionStorage.removeItem("stOseb");
    sessionStorage.removeItem("datum");
}

let klikRezerviraj=function(dogodek){
    let jedi=[].slice.call(document.getElementsByClassName("but_click")).map(x => x.value);
    let sessionStorage=window.sessionStorage;
    let ura=sessionStorage.getItem("ura");
    let stOseb=sessionStorage.getItem("stOseb");
    let datum=new Date(sessionStorage.getItem("datum")).toJSON();
    let payload={
        "ura":ura,
        "stOseb":stOseb,
        "datum":datum,
        "jedi":jedi
    };
    console.log(payload);
}

let preveriStorage=function(){
    let sessionStorage=window.sessionStorage;
    if(window.localStorage.getItem("credentials")==null){
        window.location.replace("/potrebna_prijava");
    }else if(sessionStorage.getItem("ura")==null || sessionStorage.getItem("stOseb")==null || sessionStorage.getItem("datum")==null){
        window.location.replace("/rezerviraj");
    }
}

preveriStorage();
for(let but of document.getElementsByClassName("but")){
    but.addEventListener("click",klikDodaj);
}
document.getElementById("klikRezerviraj").addEventListener("click",klikRezerviraj);

window.onunload=clearStorage;
const prekliciRezervacijo=function(dogodek){
    let id=dogodek.target.closest(".rezervacija-skatla").id;
    console.log(id);
    let xhttp=new XMLHttpRequest();
    xhttp.open("PUT","/api/rezervacija/"+id+"/preklici");
    xhttp.onload=()=>{
        if(xhttp.status==200){
            window.alert("Uspešna preklicitev");
            window.location.replace("/rezerviraj");
        }else{
            console.log(xhttp.responseText);
            window.alert("Prišlo je do napake: "+JSON.parse(xhttp.responseText).sporocilo);
            window.location.replace("/rezerviraj");
        }
    }
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(null);
}

for(let but of document.getElementsByClassName("preklici_rezervacijo")){
    but.addEventListener("click",prekliciRezervacijo);
}
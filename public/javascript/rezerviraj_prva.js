let preveriStorage=function(){
    if(window.localStorage.getItem("credentials")==null){
        window.location.replace("/potrebna_prijava");
    }
}

preveriStorage();
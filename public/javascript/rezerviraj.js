function drawCalander(year, month) {
    let firstDay=new Date(year,month,1).getDay();
    if(firstDay==0) firstDay=7;
    
    let numOfDaysCurrent=getDaysInMonth(year,month);
    let numOfDaysPrevious=getDaysInMonth(year,month-1);
    let dayArray=Array.from(new Array(firstDay-1), (x,i) => [numOfDaysPrevious-firstDay+i+2,true]);
    dayArray.push(...Array.from(new Array(numOfDaysCurrent),(x,i) => [i+1,false]));
    dayArray.push(...Array.from(new Array(42-dayArray.length),(x,i) => [i+1,true]));
    let res='';
    for (let i = 0; i < 6; i++) {
        res+='<tr>';
        for(let j=0;j<7;j++){
            res+='<td'+(dayArray[i*7+j][1] ? ' class="grayedout"' : '')+'>'+dayArray[i*7+j][0]+'</td>'
        }
        res+='</tr>';
    }
    document.getElementById("calander_inner").innerHTML=res;
    document.getElementById("leto").innerHTML=meseci[month]+" "+year;
}

function getDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
}

let removeColored=function(){
    let tds=document.getElementsByClassName("calander")[0].getElementsByTagName("tbody")[0].getElementsByTagName("td");
    [].forEach.call(tds,(td)=>{
        td.classList.remove('calander_click');
    })
}

let klicKolendar=function(dogodek){
    if(!dogodek.target.classList.contains('grayedout')){
        removeColored();
        dogodek.target.classList.add("calander_click");
    }
}

let klickKolendarNaprej=function(dogodek){
    date.setMonth(date.getMonth()+1);
    drawCalander(date.getFullYear(),date.getMonth());
}

let klickKolendarNazaj=function(dogodek){
    date.setMonth(date.getMonth()-1);
    drawCalander(date.getFullYear(),date.getMonth());
}

let klikNaprej=function(dogodek){
    let ura=document.getElementById("time").value;
    let stOseb=document.getElementById("stoseb").value;
    let dan=document.querySelector(".calander_click");
    
    let errors=[];
    if(ura=="") errors.push("uro");
    if(stOseb<1) errors.push("število oseb");
    if(dan==null) errors.push("datum");

    if(errors.length>0){
        window.alert("Prosim vnesite: "+errors.join(", "));
    }else{
        let datum=new Date(date.getFullYear(),date.getMonth(),dan.innerHTML);
        let sessionStorage=window.sessionStorage;
        sessionStorage.setItem("ura",ura);
        sessionStorage.setItem("stOseb",stOseb);
        sessionStorage.setItem("datum",datum);
        window.location.replace("/rezerviraj/menu");
    }
}

let meseci=["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"];

let date=new Date();
drawCalander(date.getFullYear(),date.getMonth());
document.getElementsByClassName("calander")[0].getElementsByTagName("tbody")[0].addEventListener('click',klicKolendar);
document.getElementById("kolendarNaprej").addEventListener("click",klickKolendarNaprej);
document.getElementById("kolendarNazaj").addEventListener("click",klickKolendarNazaj);
document.getElementById("klikNaprej").addEventListener("click",klikNaprej);

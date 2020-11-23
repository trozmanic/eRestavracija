const hbs = require('hbs');

hbs.registerHelper("not", function(obj) {
  return !obj;
});


hbs.registerHelper('izbrano', (izbrano_ime, uporabnik) => {
  let paramid = "";
  if (uporabnik) {
    paramid = "?uporabnik_id="+uporabnik._id;
  }
  const hrefs = {
    "index" : "/" + paramid,
    "onas": "/onas" + paramid,
    "menu": "/menu" +paramid,
    "rezerviraj_mizo": "/rezerviraj" +paramid
  }
  res="";
  res+='<li> <a href=" ' + hrefs.index + '"' + (izbrano_ime==='index' ? ' class="selected"' : '') +'>DOMOV</a></li>';
  res+='<li> <a href="' + hrefs.onas + '"' + (izbrano_ime==='onas' ? ' class="selected"' : '') +'>O NAS</a></li>';
  res+='<li> <a href="' + hrefs.menu + '"' + (izbrano_ime==='menu' ? ' class="selected"' : '') +'>MENU</a></li>';
  if (uporabnik) {
    res+='<li id="rezerviraj_mizo"> <a '+ (izbrano_ime==='rezerviraj_mizo' ? ' class="selected"' : '') +' href="' + hrefs.rezerviraj_mizo + '">REZERVIRAJ MIZO</a></li>';
  }
  return res;
});

hbs.registerHelper('zvezda', (stevilo_zvezdic) => {
  const zvezdica = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
      '                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n' +
      '                                </svg>';
  let resp =''
  for (let i = 0 ; i < stevilo_zvezdic ; i ++) {
    resp += zvezdica;
  }
  return resp;

})

hbs.registerHelper('nadzorna_plosca_menu_by_role', (zaposleni_role) => {
  //urnik imajo vsi
  //rezervacije,narocila_strezba,narocila_kuhinja,meni,zaloga,zasluzek,zaposleni
  var vodja= [1,1,1,1,1,1,1];
  var natakar= [1,1,0,0,0,0,0];
  var kuhar= [0,0,1,1,1,0,0];
  var racunovodja= [0,0,0,0,0,1,1];
  var vloga;
  if (!zaposleni_role) {
    vloga=vodja;
  } else {
    vloga=vodja;
    zaposleni_role.localeCompare("vodja") == 0 ? vloga=vodja : vloga=vloga;
    zaposleni_role.localeCompare("natakar") == 0 ? vloga=natakar : vloga=vloga;
    zaposleni_role.localeCompare("kuhar") == 0 ? vloga=kuhar : vloga=vloga;
    zaposleni_role.localeCompare("racunovodja") == 0 ? vloga=racunovodja : vloga=vloga;
  }
  var meni_sestavljen = (vloga[0] == 1 ? '<a href="/nadzorna_plosca/rezervacije"><i class="fas fa-user-clock ikone-stil-posamezna"></i></a>' : '');
  meni_sestavljen += vloga[1] == 1 ? '<a href="/nadzorna_plosca/strezba"><i class="fas fa-utensils ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[2] == 1 ? '<a href="nadzorna_plosca_narocila_kuhar.html"><i class="fas fa-utensils ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[3] == 1 ? '<a href="nadzorna_plosca_meni.html"><i class="fas fa-book-open ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[4] == 1 ? '<a href="/nadzorna_plosca/zaloga"><i class="fas fa-boxes ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[5] == 1 ? '<a href="/nadzorna_plosca/zasluzek"><i class="fas fa-coins ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[6] == 1 ? '<a href="/nadzorna_plosca/zaposleni"><i class="fas fa-user-cog ikone-stil-posamezna"></i></a>' : '';
  return meni_sestavljen;
});

hbs.registerHelper('nadzorna_plosca_gumbi_by_role', (zaposleni_role) => {
  //urnik imajo vsi
  //rezervacije,narocila_strezba,narocila_kuhinja,meni,zaloga,zasluzek,zaposleni
  console.log("TEST "+zaposleni_role);
  var meni_sestavljen = "";
  var presledek = '<div class="w-100"></div><div class="col">&nbsp;</div><div class="col">&nbsp;</div><div class="w-100"></div>';
  if (!zaposleni_role) {
    meni_sestavljen = '<div class="col"><a href="/nadzorna_plosca/rezervacije" role="button" class="btn btn-dark btn-block"><i class="fas fa-user-clock"></i><br>Rezervacije</a></div>';
    meni_sestavljen += presledek;
    meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/strezba" role="button" class="btn btn-dark btn-block"><i class="fas fa-utensils"></i><br>Naročila strežba</a></div>';
    meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/narocila_kuhar" role="button" class="btn btn-dark btn-block"><i class="fas fa-utensils"></i><br>Naročila kuhinja</a></div>';
    meni_sestavljen += presledek;
    meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/meni" role="button" class="btn btn-dark btn-block"><i class="fas fa-book-open"></i><br>Meni</a></div>';
    meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/zaloga" role="button" class="btn btn-dark btn-block"><i class="fas fa-boxes"></i><br>Zaloga</a></div>';
    meni_sestavljen += presledek;
    meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/zasluzek" role="button" class="btn btn-dark btn-block"><i class="fas fa-coins"></i><br>Zaslužek</a></div>';
    meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/zaposleni" role="button" class="btn btn-dark btn-block"><i class="fas fa-user-cog"></i><br>Zaposleni</a></div>';
  } else {
    if (zaposleni_role.localeCompare("vodja") == 0) {
      meni_sestavljen = '<div class="col"><a href="/nadzorna_plosca/rezervacije" role="button" class="btn btn-dark btn-block"><i class="fas fa-user-clock"></i><br>Rezervacije</a></div>';
      meni_sestavljen += presledek;
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/strezba" role="button" class="btn btn-dark btn-block"><i class="fas fa-utensils"></i><br>Naročila strežba</a></div>';
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/narocila_kuhar" role="button" class="btn btn-dark btn-block"><i class="fas fa-utensils"></i><br>Naročila kuhinja</a></div>';
      meni_sestavljen += presledek;
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/meni" role="button" class="btn btn-dark btn-block"><i class="fas fa-book-open"></i><br>Meni</a></div>';
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/zaloga" role="button" class="btn btn-dark btn-block"><i class="fas fa-boxes"></i><br>Zaloga</a></div>';
      meni_sestavljen += presledek;
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/zasluzek" role="button" class="btn btn-dark btn-block"><i class="fas fa-coins"></i><br>Zaslužek</a></div>';
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/zaposleni" role="button" class="btn btn-dark btn-block"><i class="fas fa-user-cog"></i><br>Zaposleni</a></div>';
    } else if (zaposleni_role.localeCompare("natakar") == 0) {
      meni_sestavljen = '<div class="col"><a href="/nadzorna_plosca/rezervacije" role="button" class="btn btn-dark btn-block"><i class="fas fa-user-clock"></i><br>Rezervacije</a></div>';
      meni_sestavljen += presledek;
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/strezba" role="button" class="btn btn-dark btn-block"><i class="fas fa-utensils"></i><br>Naročila strežba</a></div>';
    } else if (zaposleni_role.localeCompare("kuhar") == 0) {
      meni_sestavljen = '<div class="col"><a href="/nadzorna_plosca/narocila_kuhar" role="button" class="btn btn-dark btn-block"><i class="fas fa-utensils"></i><br>Naročila kuhinja</a></div>';
      meni_sestavljen += presledek;
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/meni" role="button" class="btn btn-dark btn-block"><i class="fas fa-book-open"></i><br>Meni</a></div>';
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/zaloga" role="button" class="btn btn-dark btn-block"><i class="fas fa-boxes"></i><br>Zaloga</a></div>';
    } else if (zaposleni_role.localeCompare("racunovodja") == 0) {
      meni_sestavljen = '<div class="col"><a href="/nadzorna_plosca/zasluzek" role="button" class="btn btn-dark btn-block"><i class="fas fa-coins"></i><br>Zaslužek</a></div>';
      meni_sestavljen += presledek;
      meni_sestavljen += '<div class="col"><a href="/nadzorna_plosca/zaposleni" role="button" class="btn btn-dark btn-block"><i class="fas fa-user-cog"></i><br>Zaposleni</a></div>';
    }
  }
  return meni_sestavljen;
});

hbs.registerHelper('concat', function (arg1, arg2){
  return arg1+''+arg2;
});

hbs.registerHelper('mesec_to_string', (mesec) => {
  var mesec_string;
  switch(parseInt(mesec)) {
    case 0:
      mesec_string = "Januar";
      break;
    case 1:
      mesec_string = "Februar";
      break;
    case 2:
      mesec_string = "Marec";
      break;
    case 3:
      mesec_string = "April ";
      break;
    case 4:
      mesec_string = "Maj";
      break;
    case 5:
      mesec_string = "Junij";
      break;
    case 6:
      mesec_string = "Julij";
      break;
    case 7:
      mesec_string = "Avgust";
      break;
    case 8:
      mesec_string = "September";
      break;
    case 9:
      mesec_string = "Oktober";
      break;
    case 10:
      mesec_string = "November";
      break;
    case 11:
      mesec_string = "December ";
      break;
    default:
      mesec_string = "Napaka helper mesec to string";
  }
  return mesec_string;
});

hbs.registerHelper('datum_to_sting', (dan, index, zac_dan, st_dni) => {
  if(!dan) {
    return "";
  } else {
    var i = parseInt(index);
    var prviDan = 0;
    zac_dan.localeCompare("pon") == 0 ? prviDan=0 : prviDan=prviDan;
    zac_dan.localeCompare("tor") == 0 ? prviDan=1 : prviDan=prviDan;
    zac_dan.localeCompare("sre") == 0 ? prviDan=2 : prviDan=prviDan;
    zac_dan.localeCompare("cet") == 0 ? prviDan=3 : prviDan=prviDan;
    zac_dan.localeCompare("pet") == 0 ? prviDan=4 : prviDan=prviDan;
    zac_dan.localeCompare("sob") == 0 ? prviDan=5 : prviDan=prviDan;
    zac_dan.localeCompare("ned") == 0 ? prviDan=6 : prviDan=prviDan;
    if (i - prviDan >= 0 && i - prviDan < st_dni) {
      //dodamo stevec
      return (i - prviDan + 1) + " " + dan[index];

    }
    return dan[index]
  }
});

hbs.registerHelper('nadzorna_urnik_prev', (leto, mesec, uporabnik_id, zaposleni_role) => {
  mesec--;
  if (mesec < 0) {
    leto--;
    mesec = 11;
  }
  var url_dodatek =  "?uporabnik_id=" + uporabnik_id;
  if(leto) {
    url_dodatek =  url_dodatek + "&leto=" + leto;
  }
  if(mesec != null) {
    url_dodatek =  url_dodatek + "&mesec=" + mesec;
  }
  if(zaposleni_role) {
    url_dodatek =  url_dodatek + "&vloga=" + zaposleni_role;
  }
  return url_dodatek;
});
hbs.registerHelper('nadzorna_urnik_next', (leto, mesec, uporabnik_id, zaposleni_role) => {
  mesec++;
  if (mesec > 11) {
    leto++;
    mesec = 0;
  }
  var url_dodatek = "?uporabnik_id=" + uporabnik_id;
  if(leto) {
    url_dodatek =  url_dodatek + "&leto=" + leto;
  }
  if(mesec != null) {
    url_dodatek =  url_dodatek + "&mesec=" + mesec;
  }
  if(zaposleni_role) {
    url_dodatek =  url_dodatek + "&vloga=" + zaposleni_role;
  }
  return url_dodatek;
});


//'<a href="/nadzorna_plosca/rezervacije"><i class="fas fa-user-clock ikone-stil-posamezna"></i></a>'

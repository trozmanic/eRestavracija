const hbs = require('hbs');

hbs.registerHelper('izbrano', (izbrano_ime) => {
  res="";
  res+='<li> <a href="/"'+ (izbrano_ime=='index' ? ' class="selected"' : '') +'>DOMOV</a></li>';
  res+='<li> <a href="/onas"'+ (izbrano_ime=='onas' ? ' class="selected"' : '') +'>O NAS</a></li>';
  res+='<li> <a href="/menu"'+ (izbrano_ime=='menu' ? ' class="selected"' : '') +'>MENU</a></li>';
  res+='<li id="rezerviraj_mizo"> <a '+ (izbrano_ime=='rezerviraj_mizo' ? ' class="selected"' : '') +' href="/rezerviraj">REZERVIRAJ MIZO</a></li>';
  return res;
});

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
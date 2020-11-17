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
  meni_sestavljen += vloga[1] == 1 ? '<a href="nadzorna_plosca_narocila_natakar.html"><i class="fas fa-utensils ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[2] == 1 ? '<a href="nadzorna_plosca_narocila_kuhar.html"><i class="fas fa-utensils ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[3] == 1 ? '<a href="nadzorna_plosca_meni.html"><i class="fas fa-book-open ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[4] == 1 ? '<a href="nadzorna_plosca_zaloga.html"><i class="fas fa-boxes ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[5] == 1 ? '<a href="nadzorna_plosca_zasluzek.html"><i class="fas fa-coins ikone-stil-posamezna"></i></a>' : '';
  meni_sestavljen += vloga[6] == 1 ? '<a href="nadzorna_plosca_zaposleni.html"><i class="fas fa-user-cog ikone-stil-posamezna"></i></a>' : '';
  return meni_sestavljen;
});
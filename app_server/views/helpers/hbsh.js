const hbs = require('hbs');

hbs.registerHelper('izbrano', (izbrano_ime) => {
  res="";
  res+='<li> <a href="/"'+ (izbrano_ime=='index' ? ' class="selected"' : '') +'>DOMOV</a></li>';
  res+='<li> <a href="onas"'+ (izbrano_ime=='onas' ? ' class="selected"' : '') +'>O NAS</a></li>';
  res+='<li> <a href="menu"'+ (izbrano_ime=='menu' ? ' class="selected"' : '') +'>MENU</a></li>';
  res+='<li id="rezerviraj_mizo"'+ (izbrano_ime=='rezerviraj_mizo' ? ' class="selected"' : '') +'> <a href="./rezervacija.html">REZERVIRAJ MIZO</a></li>';
  return res;
});
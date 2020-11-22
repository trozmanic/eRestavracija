const hbs = require('hbs');
hbs.registerPartial('myPartial', '<div class="card" id="{{_id}}">\n' +
    '                <img src="{{slika}}" class="card-img-top" alt="...">\n' +
    '                <div class="card-body">\n' +
    '                  <h1 class="card-title">{{ime}}</h5>\n' +
    '                    <p class="card-text">Za vec informacij o jedi pritisnite na sliko</p>\n' +
    '                  <p class="card-text">\n' +
    '                    {{opis}}\n' +
    '                  </p>\n' +'{{#if ocenjena }}'+ '<h1 class="button btn-menu">TO JED STE ZE OCENILI</button>' +
                        '{{else}}' + '<button type="button" class="button btn-menu" data-toggle="modal" data-target="#exampleModal">\n' +
        '                    OCENI JED\n'  +
        '                  </button>\n' + '{{/if}}' +
    '                \n' +
    '                  <div class="properties hidden" id="property-{{_id}}" >\n' +
    '                      <div class="properties-info">\n' +
    '                        <p>Kalorije: {{kalorije}}</p>\n' +
    '                        <p style="display: inline-block;">Ocena:\n' +
    '                            <div class="rating-stars">\n' + '{{{zvezda ocena}}}' + '</div>'+
    '                        </p>\n' +
    '                        <p>Cena: {{cena}}$</p>\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '            </div>')


hbs.registerPartial('menuItem', '<br>\n' +
    '                    <div class="rezervacija-skatla">\n' +
    '                        <h4>{{ ime }}</h4>\n' +
    '                        <span class="desno-float">\n' +
    '                            <button type="button" id={{ edit }} class="btn btn-dark btn-block"><i class="fas fa-edit"></i> UREDI</button>\n' +
    '                            <button type="button" id={{ del }}  class="btn btn-dark btn-block"><i class="fas fa-trash"></i> IZBRIŠI</button>\n' +
    '                        </span>\n' +
    '                        <h6>Cena: {{ cena }}€</h6>\n' +
    '                        <h6>Kalorije: {{ kalorije }}kcal</h6>\n' +
    '                        <p>{{ opis }}</p>\n' +
    '                    </div>')

hbs.registerPartial('narociloItem', "<div class=\"rezervacija-skatla\">\n" +
    "                    <h5 class=\"sredina-text\">Naročilo {{ id }}</h5>\n" +
    "                    <p class=\"levo-text kartica-padding\">\n" +
    "                        Miza: <strong>4</strong>\n" +
    "                        <span class=\"desno-float\">Datum: <strong>{{ datum }}</strong></strong></span>\n" +
    "                    </p>\n" +
    "                    <p class=\"levo-text kartica-padding\">\n" +
    "                        Sprejem naročila: <strong>{{ sprejem_narocila }}</strong>\n" +
    "                    </p>\n" +
    "                    <h6 class=\"sredina-text\"><strong>Jedi:</strong></h6>\n" +
    "                    <ul>\n" +
    "                    {{#each jedi as | jed |}} \n "+
    "                       <li>{{ jed.ime }} <strong>{{jed.kolicina}}x</strong></li>\n "+
    "                    {{/each}}"+
    "                    </ul>\n" +
    "                    <div class=\"ikone-stil\">\n" +
    "                        <i role=\"button\" class=\"far fa-check-circle ikone-stil-posamezna\"></i>\n" +
    "                        <i role=\"button\" class=\"fas fa-ban ikone-stil-posamezna\"></i>\n" +
    "                    </div>\n" +
    "                </div>")

hbs.registerPartial('narociloItemPriprava', "<div class=\"rezervacija-skatla\">\n" +
    "                    <h5 class=\"sredina-text\">Naročilo {{ id }}</h5>\n" +
    "                    <p class=\"levo-text kartica-padding\">\n" +
    "                        Miza: <strong>4</strong>\n" +
    "                        <span class=\"desno-float\">Datum: <strong>{{ datum }}</strong></strong></span>\n" +
    "                    </p>\n" +
    "                    <p class=\"levo-text kartica-padding\">\n" +
    "                        Sprejem naročila: <strong>{{ sprejem_narocila }}</strong>\n" +
    "                    </p>\n" +
    "                    <p class=\"levo-text kartica-padding\">\n" +
    "                        Začetek priprave: <strong>{{ zacetek_priprave }}</strong></span>\n" +
    "                    </p>\n" +
    "                    <h6 class=\"sredina-text\"><strong>Jedi:</strong></h6>\n" +
    "                    <ul>\n" +
    "                    {{#each jedi as | jed |}} \n "+
    "                       <li>{{ jed.ime }} <strong>{{jed.kolicina}}x</strong></li>\n "+
    "                    {{/each}}"+
    "                    </ul>\n" +
    "                    <div class=\"ikone-stil\">\n" +
    "                        <i role=\"button\" class=\"far fa-check-circle ikone-stil-posamezna\"></i>\n" +
    "                        <i role=\"button\" class=\"fas fa-ban ikone-stil-posamezna\"></i>\n" +
    "                    </div>\n" +
    "                </div>")
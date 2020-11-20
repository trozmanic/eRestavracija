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

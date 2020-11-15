const hbs = require('hbs');
hbs.registerPartial('myPartial', '<div class="card" id="card{{id}}">\n' +
    '                <img src="{{slika}}" class="card-img-top" alt="...">\n' +
    '                <div class="card-body">\n' +
    '                  <h1 class="card-title">{{ime}}</h5>\n' +
    '                    <p class="card-text">Za vec informacij o jedi pritisnite na sliko</p>\n' +
    '                  <p class="card-text">\n' +
    '                    {{opis}}\n' +
    '                  </p>\n' +
    '                  <button type="button" class="button btn-menu" data-toggle="modal" data-target="#exampleModal">\n' +
    '                    OCENI JED\n' +
    '                  </button>\n' +
    '                \n' +
    '                  <div class="properties hidden" id="property{{id}}" >\n' +
    '                      <div class="properties-info">\n' +
    '                        <p>Kalorije: {{kalorije}}</p>\n' +
    '                        <p style="display: inline-block;">Ocena:\n' +
    '                            <div class="rating-stars">\n' +
    '                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
    '                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n' +
    '                                </svg>\n' +
    '                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
    '                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n' +
    '                                </svg>\n' +
    '                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
    '                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n' +
    '                                </svg>\n' +
    '                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
    '                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n' +
    '                                </svg>\n' +
    '                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-half" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
    '                                    <path fill-rule="evenodd" d="M5.354 5.119L7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.519.519 0 0 1-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.171-.403.59.59 0 0 1 .084-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 0 1 .163-.505l2.906-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.002 2.223 8 2.226v9.8z"/>\n' +
    '                                </svg>\n' +
    '                            </div>\n' +
    '                        </p>\n' +
    '                        <p>Cena: {{cena}}$</p>\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '            </div>')

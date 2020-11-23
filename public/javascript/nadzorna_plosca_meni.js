
const editBtns = document.querySelectorAll('button[id^=edit_]');
const delBtns = document.querySelectorAll('button[id^=del_]');
const forms = document.querySelectorAll('button[id^=form_]');


editBtns.forEach(btn => {
    btn.addEventListener("click", event => {
        var splice = event.target.id.split('_');
        var id = splice[1];

        document.getElementById('form_'+id).style.visibility = 'visible';

    });
});

delBtns.forEach(btn => {
   btn.addEventListener("click", event => {
       $.ajax({
           "url": 'localhost:3000/api/men'
           })
   })
});

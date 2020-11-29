window.addEventListener('load', function (){
    document.getElementById('setDB').addEventListener('click', () => {
        axios.get('/db/init').then((response) => {

        });
        alert('Podatkovna baza nastavljena');
    });

    document.getElementById('dropDB').addEventListener('click', () => {
        axios.get('/api/database/drop').then((response) => {


        });
        alert('Vsebina baze izbrisana');
    });
});
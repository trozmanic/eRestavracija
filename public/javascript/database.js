window.addEventListener('load', function (){
    document.getElementById('setDB').addEventListener('click', () => {
        axios.get('/database/init').then((response) => {
            if(response.status == 200){
                window.location = 'http://localhost:3000/nadzorna_plosca';
            }
        });
    });

    document.getElementById('dropDB').addEventListener('click', () => {
        axios.get('/api/database/drop').then((response) => {
            if(response.status === 200){
                alert('Vsebina baze izbrisana');
            }

        });
    });
});
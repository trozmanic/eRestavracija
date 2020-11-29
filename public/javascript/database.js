window.addEventListener('load', function (){
    document.getElementById('setDB').addEventListener('click', () => {
        axios.get('/database/init');
    });

    document.getElementById('dropDB').addEventListener('click', () => {
        axios.get('/api/database/drop');
    });
});
const start = (io) => {
    io.on('connection', function (socket) {
        console.log("Socket connected!");

        socket.on('narociloKuhar', function (message) {
            console.log(message);
            io.emit('narociloKuhar', message);
        })

        socket.on('narociloNatakar', function (message) {
            const msgOBJ = JSON.parse(message);
            io.emit('narociloNatakar-' + msgOBJ.narocilo.natakar.id_uporabnika, message)
        })

    })
}


module.exports = {
    start
}

const start = (io) => {
    io.on('connection', function (socket) {
        console.log("Socket connected!");

        socket.on('narociloKuhar', function (message) {
            io.emit('narociloKuhar', message);
        })

        socket.on('narociloNatakar', function (message) {
            console.log(message);
            const msgOBJ = JSON.parse(message);
            const msg = "Kuhar je spremenil stanje narocila iz stanja: " +  "'" + msgOBJ.staroStanje + "' "  + " v " +  "'" + msgOBJ.novoStanje + "'";
            io.emit('narociloNatakar-' + msgOBJ.id_uporabnika, msg)
        })

    })
}


module.exports = {
    start
}

const start = (io) => {
    io.on('connection', function (socket) {
        console.log("Socket connected!");
        socket.on('narociloNatakar', function (message) {
            console.log(message);
        })
    })
}


module.exports = {
    start
}

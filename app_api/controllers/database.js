const mongoose=require("mongoose");

const dropDB = async (req, res) => {
    mongoose.connection.db.dropDatabase().then(() => {
        return res.status(200);
    });
    return res.status(200);
}

module.exports = {
    dropDB
}
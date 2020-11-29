const mongoose=require("mongoose");

const dropDB = async (req, res) => {
    mongoose.connection.db.dropDatabase(() => {
            return res.status(200)
    });
    return res.status(500);
}

module.exports = {
    dropDB
}
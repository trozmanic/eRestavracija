const mongoose=require("mongoose");

const dropDB = async (req, res) => {

    try{
        await mongoose.connection.db.dropDatabase();
        return res.status(200);
    }catch (err){
        return res.status(500).json({"error_message": err});
    }
}

module.exports = {
    dropDB
}
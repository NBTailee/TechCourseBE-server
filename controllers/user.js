const User = require("../models/user");
const userController = {
    // Get All User
    getAllUsers : async(req, res)=>{
        try{
            const user = await User.find();
            res.status(200).json(user); 
        }catch(err){
            res.status(500).json(err);
        }
    },

    //DELETE
    deleteUsers : async(req, res)=>{
        try{
            const user = await User.findById(req.params.id);
            res.status(200).json("Delete succesfully");
        }catch(err){
            res.status(500).json(err);
        }
    }
}
module.exports = userController;
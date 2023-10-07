const jwt = require("jsonwebtoken");

const middlewareController = {

    //verify token
    verifyToken: (req, res, next) =>{
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err,user) =>{
                if(err){
                    res.status(403).json("token is not valid")
                }
                req.user = user;
                next();
            });
        }
        else
        {
            res.status(401).json("Not login");
        }
    },
    
    // verify Admin
    verifyTokenandAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, ()=>{
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }
            else{
                console.log(req.user)
                res.status(403).json(req.user.isAdmin);
            }
        });
    },
};

module.exports = middlewareController;
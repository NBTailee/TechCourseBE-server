const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/user");
const router = require("express").Router();

// Get all users
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

//DELETE USER

router.delete("/:id",middlewareController.verifyTokenandAdmin, userController.deleteUsers);

module.exports = router;
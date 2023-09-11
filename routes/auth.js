const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth");

router.route("/register").post(userController.register);

router.route("/login").post(userController.login);

// +-------------------------------------------------+
// | POST /auth/register --- register new user       |
// | POST /auth/login    --- login based on username |
// +-------------------------------------------------+

module.exports = router;

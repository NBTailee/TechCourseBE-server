const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const saltRound = 10;

const encrypt = (plainPassword) => {
  try {
    const hash = bcrypt.hashSync(plainPassword, saltRound);
    return hash;
  } catch (err) {
    console.log("Tai check ==>: encrypt -> err", err);
  }
};
const decrypt = (password, hashPassword) => {
  isMatch = bcrypt.compareSync(password, hashPassword);
  return isMatch;
};

// REGISTER AND LOGIN API
const handleUser = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = encrypt(password);
    const user = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    try {
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const userData = await User.findOne({ username: username });
      if (userData === null) {
        res.status(500).json("User not available");
      } else {
        const hashPassword = userData.password;
        const isMatch = decrypt(password, hashPassword);
        if (isMatch) {
          const accessToken = jwt.sign({
              id: userData.id,
              admin: userData.isAdmin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "30d" }
          );
          const {password, ...xuat} = userData._doc;
          res.status(200).json({...xuat, accessToken});
        } else {
          res.status(500).json("Wrong username or password");
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = handleUser;

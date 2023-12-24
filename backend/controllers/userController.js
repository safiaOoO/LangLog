const db = require("../config/db")

const userController = {
  getUser: (req, res) => {
    if (req.session.username) {
      return res.json({ valid: true, username: req.session.username })
    } else {
      return res.json({ valid: false })
    }
  },
};

module.exports = userController

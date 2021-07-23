const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.post("/refresh_token", userCtrl.getAccessToken);
router.get("/logout", userCtrl.logout);
router.get("/getUserInfo", auth, userCtrl.getUserInfo);

module.exports = router;

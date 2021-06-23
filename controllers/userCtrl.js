const user = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const userCtrl = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body;

            // check have username, password
            if (!username || !password)
                return res
                    .status(400)
                    .json({ msg: "Please fill in all fields." });

            const User = await user.findOne({ username });

            if (User)
                return res
                    .status(400)
                    .json({ msg: "This username already exists." });

            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters." });

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new user({
                username,
                password: passwordHash,
            });

            await newUser.save();

            res.json({ msg: "Register Success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const User = await user.findOne({ username });
            console.log(User);

            // check exist user
            if (!User)
                return res
                    .status(400)
                    .json({ msg: "This email does not exist." });

            // check password
            const isMatch = await bcrypt.compare(password, User.password);

            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            const refreshToken = createRefreshToken({ id: User._id });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                path: "/user/refreshToken",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
            });

            res.json({ msg: "Login success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshToken", { path: "/user/refreshToken" });
            res.json({ msg: "LogOut!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshToken;
            console.log(rf_token);
            if (!rf_token)
                return res.status(400).json({ msg: "Please login now!" });

            jwt.verify(rf_token, keys.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err)
                    return res.status(400).json({ msg: "Please login now!" });
                const access_token = createAccessToken({ id: user.id });
                console.log(access_token);
                res.json({ access_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserInfo: async (req, res) => {
        try {
            const User = await user.findById(req.user.id).select("-password");
            res.json(User);
            console.log(User);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, keys.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (payload) => {
    return jwt.sign(payload, keys.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;

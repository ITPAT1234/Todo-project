const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const auth = (req, res, next) => {
    try {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzllNWM5ZGY2YTllMGY4OGFhYmUwMSIsImlhdCI6MTYyMzkzNTIzMywiZXhwIjoxNjI0MDIxNjMzfQ.36MHYA69Cyq7Kxel4yeCRTeF3K6jteHevBf3THAYwAM";
        if (!token)
            return res.status(400).json({ msg: "Invalid Authentication." });

        jwt.verify(token, keys.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(400).json({ msg: "Invalid Authentication." });
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ msg: err.massage });
    }
};

module.exports = auth;

// const token = req.header("Authorization");

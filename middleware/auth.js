const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
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

//        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGI0OWFkM2I2YzcwMTk2MDQ0ZTFlMyIsImlhdCI6MTYyNTc0NjU2Nn0.XqBdv4nCAj0audGDIOsa5v1R0tRZEpxLHspU9D9RgRU";

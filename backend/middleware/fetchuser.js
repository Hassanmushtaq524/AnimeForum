const jwt = require("jsonwebtoken");
const jwtSecret = "bradley";

const fetchuser = (req, res, next) => {

    try {
        
        // get the token
        const token = req.header("auth-token");
        if (!token) {
            return res.status(401).json({ success: false, error: "Invalid token." });
        }
        let errFound = false;
        // verify the token with the secret
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                // if an error
                errFound = true;
                return res.status(401).json({ success, error: "Invalid token." });
            } else {
                // add it to the request
                req.user = data.user;
            }
        })
        if (errFound) {
            return;
        }
        next();

    } catch (error) {

        return res.status(500).json({ error: "Internal server error." });

    }

}

module.exports = fetchuser;
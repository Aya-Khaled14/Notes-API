const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        console.log({ token });
        
        if (!token) {
            return res.status(401).send("No token provided");
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log({ decoded });

        // Set the user information in the req.user object
        req.user = decoded.id;
        console.log({ user: req.user }); 

        next(); 
    } catch (error) {  
        next(error);  
    }
}; 

module.exports = { authenticate }; 
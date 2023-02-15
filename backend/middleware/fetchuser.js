var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Rehanisgoodb$oy';

const fetchuser =(req, res, next)=>{
    //get the user details from the jwt token add id to req object
    //Here req.header('auth-token') is used to add the valid token to header section of thunderclient and after sending the request we got the user details
    const token = req.header('auth-token'); 
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    
}
module.exports = fetchuser ;
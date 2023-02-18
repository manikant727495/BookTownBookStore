var jwt = require('jsonwebtoken');

const JWT_SECRET = "manikantkumardubey";
const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error:"please atuthenticate using valid token"});
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch {
        res.status(401).json({error:"please atuthenticate using valid token"});
    }
}

module.exports = fetchuser;
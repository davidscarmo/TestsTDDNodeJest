const jwt = require('jsonwebtoken'); 
const {promisify} = require('util');

module.exports = async (req, res, next) => 
{
    const authHeader = req.headers.authorization; 

    if(!authHeader)
    {
        return res.status(401).json({message: 'Token not provided'});
    }
    const [, token] = authHeader.split(' '); //add only the token to variable token without the 'Barer' 
    try
    {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET); 
        req.userId = decoded.id; //send the decoded user id 

        return next(); 
    }catch(err)
    {
        return res.status(401).json({message: 'Invalid Token'});
    }

}
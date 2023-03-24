const jwt = require('jsonwebtoken');
const {secret} = require('../config');

module.exports = function (req, res, next) {
     if(req.method === "OPTIONS"){
          next()
     }

     try{
          const token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN
          if(!token){
               return res.json({message: "Not authorized"});
          }
          const decodedData = jwt.verify(token, secret);
          req.user = decodedData;
          next();
     } catch(e){
          console.log(e);
          return res.status(403).json({message: "Not authorized"})
     }
}

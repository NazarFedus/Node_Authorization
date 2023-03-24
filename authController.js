const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const { getMaxListeners } = require('./models/User');
const {secret} = require('./config');

const generateAccessToken = (id, roles) => {
     const payload = {
          id,
          roles
     }
     return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class authController {
     async registration(req, res){
          try{
               const errors = validationResult(req);
               if(!errors.isEmpty()){
                    return res.status(400).json({message: "Registration error", errors})
               }

               const {username, password} = req.body; // to get data from the body of the request
               const candidate = await User.findOne({username}); // to find the user in the database
               if(candidate){
                    return res.status(400).json({message: "User with this username already exists"})
               }

               const hashPassword = bcrypt.hashSync(password, 7);
               const userRole = await Role.findOne({value: "USER"});
               const newUser = new User({username, password: hashPassword, roles: [userRole.value]});
               await newUser.save(); // to save the user in the database
               return res.json({message: "User was created"}); // to send a response to the client
          } catch(e) {
               console.log(e);
               res.status(400).json({message: "Registration error"})
          }
     }
     async login(req, res){
          try{
               const {username, password} = req.body;
               const user = await User.findOne({username}); // return object with user or null
               if(!user){
                    return res.status(400).json({message: "User not found"});
               }

               const validPassword = bcrypt.compareSync(password, user.password); // to compare the password from the request with the password from the database;
               if(!validPassword){
                    return res.status(400).json({message: "Invalid password"});
               }

               const token = generateAccessToken(user._id, user.roles); // to generate a token
               return res.json({token}); // to send a response to the client

          } catch(e){
               console.log(e);
               res.status(400).json({message: "Login error"})
          }
     }
     async getUsers(req, res){
          try{
               res.json("server work");
          } catch(e){

          }
     }
}

module.exports = new authController();

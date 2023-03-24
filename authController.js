const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

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

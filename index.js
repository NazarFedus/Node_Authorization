const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
     try{
          await mongoose.connect('mongodb+srv://NazarFedus:LQJfWinnpLR1JkBv@cluster0.6w5meoa.mongodb.net/?retryWrites=true&w=majority')
          app.listen(PORT, () => {
               console.log(`Server started on port: ${PORT}...`);
          })
     } catch(e) {
          console.log(e);
     }
}

start();
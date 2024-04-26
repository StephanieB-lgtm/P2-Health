const express = require( 'express' );
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const sessions = require('express-session');
const app = express();
const dotenv = require('dotenv');


const dbCode = require('./config/mongoKeys');
dotenv.config({ path: './config/config.env' })

// EJS
app.use(expressLayouts)
app.set("view engine", "ejs")

console.log(process.env.MONGO_URI)

mongoose.connect(dbCode.MongoURI)
  .then(() => {
    console.log("Connected to MongoDB...");
    
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Sessions from Express to save sessions for login 
app.use( sessions({
    secret: 'secretCode',
    resave: true,
    saveUninitialized: true
  })
);

// Routes 

app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))


const PORT =  process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT} on http://localhost:${PORT}`);
});


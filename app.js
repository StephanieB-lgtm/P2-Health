const express = require( 'express' );
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();

// EJS
app.use(expressLayouts)
app.set("view engine", "ejs")

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Sessions from Express to save sessions for login 
  app.use(
    session({
      secret: 'SecretCode',
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


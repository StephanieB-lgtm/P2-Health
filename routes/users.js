const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');



const user = require('../models/User');


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors:errors,
        name,
        email,
        password,
        password2
      })
    }
    else {
        user.findOne({email:email}).then(userFound=>{
            if(userFound){
                errors.push({msg:'This email/user exists'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else{
                const newUser = new user({
                    fullName:name,
                    email,
                    password
                })
                console.log(newUser);
            }
        })
    }
}
    
    );


module.exports = router;

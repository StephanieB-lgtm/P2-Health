const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');



const user = require('../models/User');


router.get('/login',  (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register',async (req, res) => {
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
         try {
            const userFound = await user.findOne({ email: email });
            if (userFound) {
                errors.push({ msg: 'This email/user exists' });
                // Render form with errors...
            } else {
                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

                const newUser = new user({
                    fullName: name,
                    email,
                    password: hashedPassword // Save hashed password
                });

                // Save user to database
                await newUser.save();
                console.log('User registered:', newUser);
                res.send('Registration successful');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle error...
        }
    }});
module.exports = router;

const express = require('express');
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const addUsers = require("../models/modelStaff")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const fetchUsers = require('../middleware/fetchUser');

const Jwt_Secret_Key = "KeyByRafaySty@le";


router.post('/signup', async (req, res) => {
    try {
        const user1 = await addUsers.findOne({ email: req.body.email });
        if (user1) {
            return res.status(500).json('Email Already Exist!');
        }else{
            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password, salt)
            const userData = new addUsers({
                username: req.body.username,
                email: req.body.email,
                password: securePass,
                role: req.body.role
            });
            
            await userData.save();
            const getData = {
                user: {
                    id: userData._id
                }
            }
            const auth_token = jwt.sign(getData, Jwt_Secret_Key);
            console.log('Data inserted.');
            res.status(200).json({token:auth_token});
            
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user1 = await addUsers.findOne({ email, role: {$in: [0, 1 ]}});
        if (!user1) {
            return res.status(500).json("Incorrect logins");
        }

        const cmpPass = await bcrypt.compare(password, user1.password);
        if (!cmpPass) {
            return res.json("Incorrect logins");
        }
        const getData = {
            user: {
                id: user1.id
            }
        }
        const auth_token = jwt.sign(getData, Jwt_Secret_Key);
        req.session.token = auth_token;
        res.status(200).json({token:auth_token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post("/Customerlogin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user1 = await addUsers.findOne({ email, role: 2 });
        if (!user1) {
            return res.status(500).json("Incorrect logins");
        }

        const cmpPass = await bcrypt.compare(password, user1.password);
        if (!cmpPass) {
            return res.json("Incorrect logins");
        }
        const getData = {
            user: {
                id: user1.id
            }
        }
        const auth_token = jwt.sign(getData, Jwt_Secret_Key);
        req.session.token = auth_token;
        res.status(200).json({token:auth_token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// to get customer through jwt token coming from body of react checkout
router.post("/getCustomer",async (req, res) => {
    try {

        const data = jwt.verify(req.body.token, Jwt_Secret_Key);
        const id = data.user.id;
        const user = await addUsers.findById(id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

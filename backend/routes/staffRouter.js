const express = require('express');
const staffRouter = express.Router();
const Staff = require('../models/modelStaff');

// Route to add new Staff members
staffRouter.post('/addStaff', async (req, res) => {
    try {
        const newStaff = new Staff({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role:req.body.role
        });
        // Check if a staff member with the same email already exists
        const existingStaff = await Staff.findOne({ username: req.body.username });
        if (existingStaff) {
            return res.status(409).send('Staff member with the same email already exists.');
        }

        // Save the new staff member to the database
        const response= await newStaff.save();

        if (response) {
            return res.status(200).json('work');
        } else {
            return res.status(500).send('not work');
        }
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send('An error occurred while adding the staff member.');
    }
});

// Route to retrieve all staff
staffRouter.get("/showStaff", async (req, res) => {
    try {
        const results = await Staff.find({ role: { $in: [0, 1] } });
        res.status(200).json({ result: results });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the records.' });
    }
});

// Route to retrieve all staff
staffRouter.get("/showCustomer", async (req, res) => {
    try {
        const results = await Staff.find({role:2});
        res.status(200).json({ result: results });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the records.' });
    }
});

// Route to fetch staff data for updating
staffRouter.get('/setStaffData', async (req, res) => {
    try {
        let id = req.query.id;
        console.log("Id in set Staff Member Data: ", id);
        let staffData = await Staff.findOne({ _id: id });
        if (!staffData) {
            res.status(404).json("staff Data Not Found In Database");
        } else {
            res.status(200).json({ staffData }); // Corrected response object
            console.log("Send fetch Data");
        }
    } catch (error) {
        res.status(500).json("Staff data for Update not Get");
    }
});

// Route to handle the update post form submission
staffRouter.post('/updateStaff',async (req, res) => {
    try {
        let id = req.query.id;
        await Staff.findByIdAndUpdate({ _id: id }, { $set: 
            {
            email: req.body.email
        } 
    });

        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json("not updated");
    }
});

// Route to delete a Staff
staffRouter.delete('/deleteStaff', async (req, res) => {
    try {
        const id = req.query.id;
        let getStaff = await Staff.findById(id);

        if (!getStaff) {
            return  res.json({message:'Staff not found'});
        }

        await Staff.findOneAndRemove({ _id: id });

        res.status(200).json("Deleted");
    } catch (error) {
        res.status(500).json("Staff member not Delete");
    }
});

module.exports = staffRouter;
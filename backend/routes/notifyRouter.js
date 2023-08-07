const express = require('express');
const notifyRouter = express.Router();
const Notify = require('../models/modelNotify');

// Route to retrieve all staff
notifyRouter.get("/showNotify", async (req, res) => {
    try {
        const results = await Notify.find().sort({ date: -1 }).limit(4);
        res.status(200).json({ result: results });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the records.' });
    }
});

module.exports = notifyRouter;
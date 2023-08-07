const express = require('express');
const dashboardRouter = express.Router();
const Purchase = require("../models/modelPurchase");
const Orders = require("../models/modelOrder");
const Orderdetail = require("../models/modelOrderdetail");
const Customers = require("../models/modelStaff");
const Products = require("../models/modelProduct");

dashboardRouter.get('/data', async (req, res) => {
    try {
        const currentDate = new Date();
        const dateParam = req.query.date; // Get the date from the query parameter

        // Parse the date parameter if provided
        const selectedDate = dateParam ? new Date(dateParam) : currentDate;
        // Now, you can use the selectedDate to filter the records in your database query
        // For example, if you have a date field in your Purchase collection named "createdAt", you can use it like this:
        const results = await Purchase.find({ date: { $gte: selectedDate } });
        const totalPurchase = results.reduce((sum, purchase) => sum + purchase.amount, 0);


        const results1 = await Orders.find({ date: { $gte: selectedDate }});
        const totalSale= results1.reduce((sum, sale) => sum + sale.amount, 0);


        const totalOrders = await Orders.countDocuments({ date: { $gte: selectedDate } });

        const totalCustomers = await Customers.countDocuments({ role: 2, date: { $gte: selectedDate } });

        const brandData = await Orderdetail.aggregate([
            {
              $unwind: "$orderDetail"
            },
            {
              $match: {
                "date": { $gte: selectedDate  }
              }
            },
            {
              $group: {
                _id: "$orderDetail.brand",
                totalShirts: { $sum: "$orderDetail.quantity" },
                totalPrice: { $sum: { $multiply: ["$orderDetail.quantity", "$orderDetail.price"] } }
              }
            },
            {
              $project: {
                _id: 0,
                brand: "$_id",
                totalShirts: 1,
                totalPrice: 1
              }
            }
          ]);
          

        res.status(200).json({ totalPurchase, totalSale, totalOrders, totalCustomers, brandData });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the records.' });
    }
});

module.exports = dashboardRouter;
const express = require('express');
const orderRouter = express.Router();
const Orders=require("../models/modelOrder");
const OrderDetail=require("../models/modelOrderdetail");


  // add order

orderRouter.post("/addOrder", async (req, res) => {
    try {
      const newOrder = new Orders({
          email: req.body.email,
          amount: req.body.amount
      });

      // Save the new order member to the database
      const response= await newOrder.save();
      
      if (response) {
        const orderid=response._id;
        const newOrderdetail = new OrderDetail({
          order_id: orderid,
          orderDetail: req.body.orderDetail,
          address: req.body.address,
          country: req.body.country,
          state: req.body.state,
          zip: req.body.zip
      });
      // Save the new order member to the database
      const responseDetail= await newOrderdetail.save();
          if(responseDetail){
            return res.status(200).json('Order Detail Sent!');
          }else{
            return res.status(500).json('Order Detail Not Sent!');
          }
      } else {
          return res.status(500).json('Error in Submitting Order!');
      }
  } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json('An error occurred while adding the order member.');
  }
});

orderRouter.get("/showorders", async (req, res) => {
    
  try {
    const results= await Orders.find();
    // res.render("products",{result: results });
    res.status(200).json({result:results});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the records.' });
  }
});

orderRouter.get("/showOrderDetail", async (req, res) => {
    const id=req.query.order_id;
  try {
    const results= await OrderDetail.findOne({order_id:id});
    // res.render("products",{result: results });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the records.' });
  }
});

// toggle order status
orderRouter.get('/toggleOrderStatus', async (req, res) => {
  const id = req.query.id;
  try{
    const prev_status = await  Orders.findOne({ _id: id});
    if(prev_status.status==1){
      await Products.updateOne(
        { _id: id },
        {
          $set: {
            status:0
          } // Update the fields from the updateData object
        }
      )
      res.status(200).json("succesfully changed to 0");
    
    }else if(prev_status.status==0){
      await Orders.updateOne(
        { _id: id },
        {
          $set: {
            status:1
          } 
        }
      )
      res.status(200).json("succesfully changed to 1");
    }
  }catch(err){
    res.status(500).json(err);
  }
  
});

// delete Order

orderRouter.get('/deleteOrder', async (req, res) => {
  try {
      const id = req.query.id;
      let response = await Orders.findById(id);

      if (!response) {
          return  res.json({message:'Staff not found'});
      }

      await Orders.findOneAndRemove({ _id: id });

      let response1 = await OrderDetail.findOne({order_id:id});

      if (!response1) {
          return  res.json({message:'Order Item not found'});
      }

      await OrderDetail.findOneAndRemove({order_id:id});

      res.status(200).json("Deleted");
  } catch (error) {
      res.status(500).json("Order Not Deleted!");
  }
});

module.exports = orderRouter;
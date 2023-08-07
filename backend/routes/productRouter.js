const express = require('express');
const { ObjectId } = require('mongodb');
const productRouter = express.Router();
const Products=require("../models/modelProduct");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Image //
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationPath = path.join(__dirname, "../public/images");
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  var upload = multer({
    storage: storage
  });


  // saveProduct

  productRouter.post('/saveProductRecord', upload.fields([
    { name: 'featured', maxCount: 1 },
    { name: 'images', maxCount: 6 },
  ]), async (req, res) => {
    try {
      let feature = req.files['featured'][0].filename;
      let gallery = req.files['images'].map(file => file.filename); // Correct way to access the filename for each file in the 'images' array
  
      const data = new Products({
        title: req.body.title,
        description: req.body.description,
        brand: req.body.brand,
        quantity: req.body.quantity, // Use req.body.quantity to access the quantity field
        price: req.body.price,
        featured: feature,
        images: gallery,
        size: req.body.size
      });
  
      await data.save() // Save the data to the database if needed
  
      res.status(200).json("successful"); // Send the data as the response
    } catch (error) {
      res.status(500).json('Catch Block in add Students');
    }
  });


  // show product

  productRouter.get("/showproducts", async (req, res) => {
    console.log(req.query.brand)
    try {
      if(req.query && req.query.brand){
        const results= await Products.find({brand: req.query.brand});
        res.status(200).json({result: results});
      }else{
        const results= await Products.find(req.body.brand);
        res.status(200).json({result: results});
      }     
      // res.render("products",{result: results });
      
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the records.' });
    }
});


// deletet Product

productRouter.get('/deleteProduct', async (req, res) => {
  const id = req.query.id;
  try {
    // Find the product by id
    const result = await Products.findById({ _id: id });

    // Delete the featured image
    const featuredImagePath = path.join(__dirname, "../public/images", result.featured);
    if (fs.existsSync(featuredImagePath)) {
      fs.unlinkSync(featuredImagePath);
    }

    // Delete the images from the images array
    const imagesPath = path.join(__dirname, "../public/images");
    result.images.forEach((image) => {
      const imagePath = path.join(imagesPath, image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    // Delete the record from the database
    await Products.findByIdAndDelete(id);

    res.status(200).json({ message: 'Product and associated images deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the record.' });
  }
});

// toggleStatus

productRouter.get('/toggleStatus', async (req, res) => {
  const id = req.query.id;
  try{
    const prev_status = await  Products.findOne({ _id: id});
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
      await Products.updateOne(
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

// update product

productRouter.get("/showUpdateProduct", upload.single("featured"), async (req, res) => {

  const id = req.query.id;
  try {
    const result = await Products.findOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the records.' });
  }
});

// remove imagedata

productRouter.delete('/removeImage', async (req, res) => {
  const productId = req.body.id;
  const imageName = req.body.img;

  try {
    // Find the product by its ID
    const product = await Products.findById(productId);

    // If the product is not found, return an error
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Remove the image from the images array using $pull operator
    product.images = product.images.filter((image) => image !== imageName);

    // Save the updated product to the database
    await product.save();

    // Fetch the updated product data from the database
    const updatedProduct = await Products.findById(productId);

    return res.status(200).json({ message: 'Image removed successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to remove image' });
  }
});


// save update

// Route to handle the update post form submission
productRouter.post('/saveUpdateProduct', upload.fields([
  { name: "featured", maxCount: 1 },
  { name: "images" }
]), async (req, res) => {
  try {
      let id = req.query.id;
      console.log("Id in update Api form query: ", id);
      let productData = await Products.findOne({ _id: id });
      const singleImage = req.files["featured"] ? req.files["featured"][0].filename : undefined;
      const multipleImages = req.files["images"] ? req.files["images"].map(file => file.filename) : [];

      // Construct the update object using the fields provided in the request
      const updateObject = {
          title: req.body.title,
          description: req.body.description,
          brand: req.body.brand,
          quantity: req.body.quantity,
          price: req.body.price
      };
      // res.json(updateObject)
      console.log(updateObject)
      // Handle the featured image
      if (singleImage) {
          // If a new featured image is uploaded, delete the old one from the file system
          try {
              await fs.unlink(`./public/images/${productData.featured}`);
          } catch (error) {
              console.error("Error deleting old featured image:", error);
          }

          // Set the new featured image name in the update object
          updateObject.featured = singleImage;
      } else {
          // If no new featured image is uploaded, retain the old one
          updateObject.featured = productData.featured;
      }
      
      
      // Handle the gallery images
      if (multipleImages.length > 0) {
          // If new gallery images are uploaded, delete the old ones from the file system
          const oldImages= productData.images;
          const newImageRecord=oldImages.concat(multipleImages)

          // Set the new gallery image names in the update object
          updateObject.images = newImageRecord;
      } else {
          // If no new gallery images are uploaded, retain the old ones
          updateObject.images = productData.images;
      }


      // Handle the product size
      updateObject.size = req.body.size || [];
      
      // // Use $set to update only the specified fields without affecting others
      await Products.findByIdAndUpdate({ _id: id }, { $set: updateObject });

      res.status(200).json("updated");
  } catch (error) {
      res.status(500).json("not updated");
      console.log('Not Update');
  }
});

// selected product delete
productRouter.post('/deleteSelectedProducts', async (req, res) => {
  const productIds = req.body.productIds; // Assuming the frontend sends an array of order IDs
  // Delete the selected orders from MongoDB

  // Convert the orderIds array to MongoDB ObjectIds
  const mongoObjectIds = productIds.map(id => new ObjectId(id));
  try {
    const response = await Products.deleteMany({ _id: { $in: mongoObjectIds } });
    if (response.deletedCount > 0) {
      res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ success: false, message: 'No matching orders found.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }

});
module.exports = productRouter;
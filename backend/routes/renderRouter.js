const express = require('express');
const Router = express.Router();
const fetchUser=require('../middleware/fetchUser')

// Router.use(fetchUser);

Router.get('/index', fetchUser, (req, res) => {
    try {

        res.render("index", { currentPage: 'index' });
    } catch (error) {
        res.send('index page not render');
    }
});

Router.get('/signin', fetchUser, (req, res) => {
    try {

        res.render("signin");
    } catch (error) {
        res.send('signin page not render');
    }
});

Router.get('/signup', fetchUser, (req, res) => {
    try {

        res.render("signup");
    } catch (error) {
        res.send('Signup page not render');
    }
});

Router.get('/table', fetchUser, (req, res) => {
    try {

        res.render("table");
    } catch (error) {
        res.send('table page not render');
    }
});

Router.get('/typography', fetchUser, (req, res) => {
    try {

        res.render("typography");
    } catch (error) {
        res.send('typography page not render');
    }
});

Router.get('/widget', fetchUser, (req, res) => {
    try {

        res.render("widget");
    } catch (error) {
        res.send('widget page not render');
    }
});

Router.get('/products', fetchUser, (req, res) => {
    try {

        res.render("products", { currentPage: 'product' });
    } catch (error) {
        res.send('typography page not render');
    }
});

Router.get('/addProduct', fetchUser, (req, res) => {
    try {

        res.render("addProduct");
    } catch (error) {
        res.send('typography page not render');
    }
});

Router.get('/updateProduct', fetchUser, (req, res) => {
    try {

        res.render("updateProduct");
    } catch (error) {
        res.send('updateProduc page not render');
    }
});

Router.get('/addUser', fetchUser, (req, res) => {
    try {

        res.render("addUser");
    } catch (error) {
        res.send('addUser page not render');
    }
});

Router.get('/user', fetchUser, (req, res) => {
    try {

        res.render("user");
    } catch (error) {
        res.send('User page not render');
    }
});


Router.get('/addProductApi', fetchUser, (req, res) => {
    try {

        res.render("user");
    } catch (error) {
        res.send('User page not render');
    }
});


// orders

Router.get('/orders', fetchUser, (req, res) => {
    try {

        res.render("orders", { currentPage: 'order' });
    } catch (error) {
        res.send('Order page not render');
    }
});

Router.get('/orderdetail', fetchUser, (req, res) => {
    try {

        res.render("orderdetail");
    } catch (error) {
        res.send('Order page not render');
    }
});

Router.get('/customer', fetchUser, (req, res) => {
    try {

        res.render("customer", { currentPage: 'customer' });
    } catch (error) {
        res.send('Customer page not render');
    }
});

Router.get('/logout', (req, res) => {
    // Remove the token from the session
    delete req.session.token; // or req.session.token = null;
  
    // Optionally, you can also destroy the entire session to clear all session data
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      // Redirect or respond as needed after logout
      res.redirect('/signin'); // Redirect to login page, for example
    });
  });


module.exports = Router;
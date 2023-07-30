const jwt = require('jsonwebtoken');
const Jwt_Secret_Key = "KeyByRafaySty@le";

const fetchUsers = async (req, res, next) => {
    const token = req.session.token;
    const isOnSignInPage = req.url === '/signin';

    if (token) {
        try {
            
            if (isOnSignInPage) {
                return res.redirect('/index'); // Redirect to dashboard or any other protected route
            }
            next();
        } catch (error) {
            res.status(401).send({ error: "Please authenticate" });
        }
    } else {
        if (!isOnSignInPage) {
            return res.redirect('/signin'); // Redirect to /login route if token doesn't exist
        }

        next();// Redirect to /login route if token doesn't exist
    }
}

module.exports = fetchUsers;

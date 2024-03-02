const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.MY_SECRET);
        const expiration = payload?.exp;
        let now = Date.now() / 1000;
        
        if(expiration < now) {
            throw new Error('Session Expired, relogin...')
        }
        
        const user = await User.findOne({ _id: payload?.data?._id, 'tokens.token': token});

        if (!user) {
            throw new Error('User not found')
        }

        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        res.status(400).send(error)
    }
}

module.exports = auth;
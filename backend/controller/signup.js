const User = require('../models/User')

module.exports.signUpUser = (req, res) => {
    User.addUser(req.body)
    .then( () => {
        console.log('user added');
    })
    .catch( (err) => {
        console.log(`Failed to login the user due to ${err}`)
    });

    return res.status(200).json({
        message : 'User Added'
    });
};

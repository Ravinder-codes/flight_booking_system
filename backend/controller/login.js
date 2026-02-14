const User = require('../models/User');
const Password = require('../models/Password');

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const userObj = await User.findOne({ email });

    if (!userObj) {
        return res.status(500).json(
            {
                message: 'User or password not find'
            }
        );
    }
    const valid = await Password.validatePassword(password, userObj.password_id);
    if (!valid) {
        return res.status(500).json(
            {
                message: 'Incorrect password'
            }
        );
    }

    return res.status(302).redirect('/home');
};

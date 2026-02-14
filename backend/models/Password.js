const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
    last_modified: Date,
    password: String
});

const Password = new mongoose.model('dim_password', passwordSchema, 'dim_password');

Password.addPassword = async (userObj) => {
    const password = new Password({
        last_modified: new Date(),
        password: userObj.password
    });
    
    await password.save()
    return password._id;  
};

Password.validatePassword = async (inputPassword, passwordId) => {
    const passwordObj = await Password.findById(passwordId);
    if (!passwordObj) return false;
    return passwordObj.password === inputPassword;
}

module.exports = Password;

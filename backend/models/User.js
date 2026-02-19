const mongoose = require('mongoose')

const Password = require('./Password')


const userSchema = mongoose.Schema({
    last_modified: Date,
    is_active: Boolean,
    name: String,
    email: String,
    password_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dim_password'
    }
})

const User = mongoose.model('dim_user', userSchema, 'dim_user');

User.addUser = (userObj) => {
    console.log(userObj)
    // TODO: Convert to hash
    
    Password.addPassword(userObj)
    .then( async (passwordId) => {
        const user = new User({
            last_modified: new Date(),
            name: userObj.name,
            email: userObj.email,
            password_id: passwordId
        });
        return await user.save();
    })
    .catch( (err) => {
        // TODO: Delete the password
        console.log(`Cannot save the user ${err}`)
    })
}

module.exports = User;

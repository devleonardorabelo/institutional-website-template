const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: {
        type : String,
        required: true  
    },
    password: {
    	type: String,
        required: true
    },
    admin: Boolean
})

module.exports = mongoose.model('User', userSchema);

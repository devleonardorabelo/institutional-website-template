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
    email: String,
    business: String,
    phone: String,
    city: String,
    state: String,
    cep: String
})

module.exports = mongoose.model('User', userSchema);

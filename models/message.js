const mongoose = require('mongoose')

var messageSchema = mongoose.Schema({
    name    : String,
    email   : String,
    content : String
})

module.exports = mongoose.model('Message', messageSchema)
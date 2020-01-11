const mongoose = require('mongoose')

var productSchema = mongoose.Schema({
    title   : String,
    content : String
})

module.exports = mongoose.model('Product', productSchema)
const mongoose = require('mongoose')

var postSchema = mongoose.Schema({
    title       : String,
    content     : String,
    description : String,
    image       : String,
    thumbnail   : String,
    url         : String
})

module.exports = mongoose.model('Post', postSchema)
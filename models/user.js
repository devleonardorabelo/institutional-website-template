const mongoose = require('mongoose'),
      bcrypt   = require('bcryptjs')

var userSchema = mongoose.Schema({
    local: {
        username : String,
        password : String    
    }
})

// generating a hash (gera um hash)
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid (checa se o password é valido)
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

var LocalStrategy    = require('passport-local').Strategy,
    User             = require('../models/user'),
    passport         = require('passport'),
    bcrypt           = require('bcryptjs')


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
    // INPUTS FOR LOGIN (INPUTS QUE SERVIRÃO PARA LOGIN)
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
async (req, username, password, done) => {

    User.findOne({ 'username' :  username }, async (err, user) => {
        console.log(user.password)
        if (err)
            return done(err);
        if (!user)
            return done(null, false, req.flash('loginMessage', 'user not found'));

        bcrypt.compare(password, user.password, (err, success) => {
            if (success){
                return done(null, user)
            }else{
                return done(null, false, req.flash('loginMessage', 'incorrect password'));
            }
        })
    });

}));

passport.use('local-signup', new LocalStrategy({
    // INPUTS FOR REGISTER (INPUTS QUE SERVIRÃO PARA REGISTRO)
    usernameField     : 'username',
    passwordField     : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
async (req, username, password, done) => {


        //  to know if the username is in use.(para saber se o nome de usuario está em uso)
        User.findOne({'username': username}, async (err, existingUser) => {

            // if there are any errors, return the error (se nao tiver algum erro, retorna o erro)
            if (err)
                return done(err);

            // check to see if there's already a user with that username (checa se existe algum usuario com o mesmo nome)
            if (existingUser) 
                return done(null, false, req.flash('signupMessage', 'This user is already in use'));

            // create the user
            let passwordHash = await bcrypt.hash(password, 10)
            let newUser = await {
                username: username,
                password: passwordHash
            } 
            new User(newUser).save(function(err, user) {
                if (err)
                    throw err;

                return done(null, user);
            });
 
            

        });


}));

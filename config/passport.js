var LocalStrategy    = require('passport-local').Strategy,
    User             = require('../models/user'),
    passport         = require('passport')


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
function(req, username, password, done) {
    // asynchronous
    process.nextTick(function() {
        User.findOne({ 'local.username' :  username }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'Usuário não encontrado'));
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Senha incorreta'));
            else // all right? User logged (TUDO CERTO? USUARIO LOGADO)
                return done(null, user);
        });
    });

}));

passport.use('local-signup', new LocalStrategy({
    // INPUTS FOR REGISTER (INPUTS QUE SERVIRÃO PARA REGISTRO)
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, username, password, done) {

    // asynchronous
    process.nextTick(function() {

        //  to know if the username is in use.(para saber se o nome de usuario está em uso)
        User.findOne({'local.username': username}, async (err, existingUser) => {

            // if there are any errors, return the error (se nao tiver algum erro, retorna o erro)
            if (err)
                return done(err);

            // check to see if there's already a user with that username (checa se existe algum usuario com o mesmo nome)
            if (existingUser) 
                return done(null, false, req.flash('signupMessage', 'Este usuario já está em uso!'));

            //  If we're logged in, we're connecting a new local account. (se estiver logado, nós conectamos na nova conta local)
            if(req.user) {
                var user            = req.user;
                user.local.username = username;
                user.local.password = user.generateHash(password);
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            } 
            //  We're not logged in, so we're creating a brand new user.
            else {
                // create the user
                var newUser            = new User();

                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if (err)
                        throw err;

                    return done(null, newUser);
                });    
            }

        });
    });

}));
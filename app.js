//MODULES
const express      = require('express'),
      exphbs       = require('express-handlebars'),
      mongoose     = require('mongoose'),
      passport     = require('passport'),
      session      = require('express-session'),
      bodyParser   = require('body-parser'),
      cookieParser = require('cookie-parser'),
      flash        = require('connect-flash'),
      path         = require('path')

        const app = express()

//MODELS
const Message = require('./models/message')
const Post    = require('./models/post')

//BD
mongoose.connect('mongodb://localhost:27017/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

//MORE CONFIGS
app.use(flash());
app.use(express.static(path.join(__dirname,'public'))) //PUBLIC DIRECTORY
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
    secret: '44421984(%09u7*&218g1erg41fsdr8',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

//ROUTES
const admin = require('./routes/admin'),
      auth  = require('./routes/auth')
app.use('/admin', admin)
app.use('/auth', auth)

//VIEWS
app.get('/', async (req, res) => {
    let posts = await Post.find()
    res.render('home',{
      user: req.user,
      post: posts
    })
})

app.post('/newmsg', (req, res) => {
    new Message(req.body).save()
    return res.redirect('/')
})

const port = process.env.PORT || 21068
app.listen(port, () => {
    console.log(`conectado na porta ${port}`)
})

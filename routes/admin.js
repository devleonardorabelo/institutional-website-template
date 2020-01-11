const express = require('express'),
      router  = express.Router(),
      Product = require('../models/product')
      
async function verifyUser(req, res, next) {
    if(req.user){
        next()
    }else{
        return res.redirect('/auth/login')
    }
}
router.get('/', verifyUser, (req, res) => {
    res.render('admin/home', {
        user: req.user
    })
})
router.get('/add/product', (req, res) => {
    
})
module.exports = router
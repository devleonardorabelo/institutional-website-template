const express = require('express'),
      router  = express.Router(),
      Message = require('../models/message')
 
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
router.get('/messages', verifyUser, async (req, res) => {
    let messages = await Message.find()
    res.render('admin/messages', {
        user: req.user,
        message: messages
    })
})
router.get('/delmsg/:id', verifyUser, async (req, res) => {
    let delmsg = await Message.deleteOne({_id: req.params.id})
    return res.redirect('/admin/messages')
})
module.exports = router
const express = require('express'),
      router  = express.Router(),
      Message = require('../models/message')
      Post    = require('../models/post')

async function verifyUser(req, res, next) {
    if(req.user){
        next()
    }else{
        return res.redirect('/auth/login')
    }
}
//INDEX ROUTES
    router.get('/', verifyUser, (req, res) => {
        res.render('admin/home', {
            user: req.user
        })
    })
//POST ROUTES
    router.get('/posts', verifyUser, async (req, res) => {
        let posts = await Post.find()
        res.render('admin/posts', {
            user: req.user,
            post: posts
        })
    })
    router.post('/addpost', verifyUser, async (req, res) => {
        let findPost = await Post.findOne({url: req.body.url})
        if(findPost){
            res.redirect('/admin/posts')
            console.log('já existe essa url')
        }else{
            new Post(req.body).save()
            return res.redirect('/admin/posts')
        }
    })
    router.get('/delpost/:id', verifyUser, async (req, res) => {
        await Post.deleteOne({_id: req.params.id})
        return res.redirect('/admin/posts')
    })
//MESSAGE ROUTES
    router.get('/messages', verifyUser, async (req, res) => {
        let messages = await Message.find()
        res.render('admin/messages', {
            user: req.user,
            message: messages
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
        await Message.deleteOne({_id: req.params.id})
        return res.redirect('/admin/messages')
    })
module.exports = router
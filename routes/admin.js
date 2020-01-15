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
    router.get('/viewpost/:url', verifyUser, async (req, res) => {
        let post = await Post.findOne({url: req.params.url})
        res.render('admin/viewPost', {
            post: post
        })
    })
    router.post('/updatepost/:id', verifyUser, async (req, res) => {
        let post = await Post.findOne({_id: req.params.id})
        if(!req.body.image){
            image = post.image
        }else{
            image = req.body.image
        }
        if(!req.body.thumbnail){
            thumb = post.thumbnail
        }else{
            thumb = req.body.thumbnail
        }

        await Post.updateOne(
            {_id: req.params.id},
            {
                title       : req.body.title,
                description : req.body.description,
                url         : req.body.url,
                content     : req.body.content,
                image       : image,
                thumbnail   : thumb
            })
        return res.redirect(`/admin/viewpost/${req.body.url}`)
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
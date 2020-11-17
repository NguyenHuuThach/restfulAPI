const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


// Lay tat ca POST
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

// Lay 1 POST by ID
router.get('/:postId', async (req, res) => {
    try {
        const posts = await Post.findById(req.params.postId)
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error })
    }
})

// Tao ra 1 POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const savedPost = await post.save()
        res.status(201).json(savedPost)
    } catch (error) {
        res.status(404).json({ message: error })
    }
})

// Xoa 1 POST by ID
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId })
        res.status(200).json(removedPost)
    } catch (error) {
        res.status(404).json({ message: error })
    }
})

// Update title 1 POST by ID
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } })
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({ message: error })
    }
})


module.exports = router
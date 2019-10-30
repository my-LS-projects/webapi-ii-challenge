const router = require('express').Router()
const db = require('./db.js')
const {
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment
} = db

/***** G E T *****/

router.get('/', ( req, res) => {

    find()
    .then(posts => res.status(200).json(posts))
    .catch(error => {
        console.log('error', error)
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get('/:id', ( req, res ) => {
    const { id } = req.params

    findById(id)
    .then(post => {
        post ? 
        res.status(200).json(post)
        : res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
})


/***** P O S T *****/

router.post('/', ( req, res ) => {
    console.log(req.body)
    if (req.body.title && req.body.contents) {
        insert(req.body)
        .then(post => res.status(201).json(post))
        .catch(error => res.status(500).json({ error: "There was an error while saving the post to the database" }))
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

router.post('/:id/comments', ( req, res ) => {
    const postId = req.params.id

    if(req.body.text){
        insert(req.body)
        .then(comment => {
            postId ? 
            res.status(201).json(comment)
            : res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(error => res.status(500).json({ error: "There was an error while saving the comment to the database" }))
    } else {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
})

module.exports = router
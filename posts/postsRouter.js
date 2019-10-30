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

module.exports = router
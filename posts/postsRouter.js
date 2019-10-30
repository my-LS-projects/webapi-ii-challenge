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

router.get('/:id/comments', ( req, res ) => {
    const { id } = req.params
    findPostComments(id)
    .then(comments => {
        if (comments.length){
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})


/***** P O S T *****/

router.post('/', ( req, res ) => {
    const { title, contents } = req.body

    if (title && contents) {
        insert(req.body)
        .then(post => res.status(201).json(post))
        .catch(error => res.status(500).json({ error: "There was an error while saving the post to the database" }))
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

router.post('/:id/comments', ( req, res ) => {
    const { id } = req.params
    const { text, post_id } = req.body

    !text ?
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
        : findById(id)
            .then(post => {
                if (post.length < 1) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                } else {
                    return insertComment({ text, post_id : id })
                }
            })
            .then(data => {
                findCommentById(data.id)
                .then(comment => res.status(201).json(comment))
                .catch(error => {
                    console.log('error', error)
                    res.status(500).json({ error: "error retrieving comment" })
                })
            })
            .catch(error => {
                console.log('error', error)
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
})


router.delete('/:id', ( req, res ) => {
    const { id } = req.params
    const getPost = findById(id).then(post => {
        post.length < 1 ?
        res.status(404).json({ message: "The post with the specified ID does not exist." })
        : res.status(200).json(`Post with id of ${id} deleted`)
    }).catch(error => {
        console.log('error', error)
        res.status(500).json({ error: "The post could not be removed" })
    })

    remove(id)
    .then(post => res.status(200).json('post deleted', post))
    .catch(error => {
        console.log('error', error)
    })

})

module.exports = router
const express = require('express') 
const server = express() // initialize server
const postsRouter = require('./posts/postsRouter')

server.use('/api/posts', postsRouter)
server.use(express.json())

// server.get('/', ( req, res ) => {
//     res.status(200).send('Server is running')
// })


// /***** P O S T *****/

// server.post('/api/posts', ( req, res ) => {
//     console.log(req.body)
//     if (req.body.title && req.body.contents) {
//         db.insert(req.body)
//         .then(post => res.status(201).json(post))
//         .catch(error => res.status(500).json({ error: "There was an error while saving the post to the database" }))
//     } else {
//         res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
//     }
// })

// server.post('/api/posts/:id/comments', ( req, res ) => {
//     const postId = req.params.id

//     if(req.body.text){
//         db.insert(req.body)
//         .then(comment => {
//             postId ? 
//             res.status(201).json(comment)
//             : res.status(404).json({ message: "The post with the specified ID does not exist." })
//         })
//         .catch(error => res.status(500).json({ error: "There was an error while saving the comment to the database" }))
//     } else {
//         res.status(400).json({ errorMessage: "Please provide text for the comment." })
//     }
// })


// /***** G E T *****/

// server.get('/api/posts', ( req, res) => {

//     db.find()
//     .then(posts => res.status(200).json(posts))
//     .catch(error => {
//         console.log('error', error)
//         res.status(500).json({ error: "The post information could not be retrieved." })
//     })
// })

// server.get('/api/posts/:id', ( req, res ) => {
//     const { id } = req.params
//     id ? 
//     db.findById(id)
//     .then(user => {
//         res.status(200).json(user)  
//     })
//     .catch(error => {
//         console.log('error', error)
//         res.status(500).json({ error: "The post information could not be retrieved." })
//     })
//     : res.status(404).json({ message: "The post with the specified ID does not exist." })
// })

server.listen(5000, () => {
    return console.log(`Server listening on http://localhost:5000`)
})
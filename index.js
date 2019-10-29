const express = require('express') 
const db = require('./data/db.js') // import methods
const server = express() // initialize server
const port = 5000 // port number 

server.post('/api/posts', ( req, res ) => {
    console.log(req.body)
    if (req.body.title && req.body.contents) {
        db.insert(req.body)
        .then(post => res.status(201).json(post))
        .catch(error => res.status(500).json({ error: "There was an error while saving the post to the database" }))
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})


server.listen(port, () => {
    return console.log(`Server listening on http://localhost:${port}`)
})
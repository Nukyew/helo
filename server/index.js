require('dotenv').config()
const express = require('express')
const app = express()
const ctrl = require('./controller')
const {SERVER_PORT, CONNECTION_STRING} = process.env
const massive = require('massive')

app.use(express.json())

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)

app.get('/api/posts/:userid', ctrl.getPosts)
app.get('/api/post/:postid', ctrl.getOnePost)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is connected')
    app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} steps on the ladder`))
})

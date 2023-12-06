require('dotenv').config()

const products = require('./controllers/products');
const users = require('./controllers/users');
const exercises = require('./controllers/exercises');
const { requireLogin, parseAuthorizationHeader } = require('./middleware/authorization')

const express = require('express');
const path = require('path');
const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 3070;

app
    .use(express.json())
    .use(express.static(path.join(__dirname, '../client/dist')))

    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        if(req.method === 'OPTIONS') {
            return res.status(200).send({})
        }
        next()
    })

    .use(parseAuthorizationHeader)

app
    .get('/api/v1/', (req, res) => {
        res.send("Hello World, from Express")
    })
    .use('/api/v1/products', products)
    .use('/api/v1/users', users)
    .use('/api/v1/exercises', exercises)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})


// Error handling
app
    .use((err, req, res, next) => {
        console.error(err);
        const msg = {
            status: err.code || 500,
            error: err.message || 'Internal Server Error',
            isSuccess: false
        }
        res.status(msg.status).json(msg)
    })

app.listen(port, () => 
    console.log(`Server is running at https://${hostname}:${port}/`)
);
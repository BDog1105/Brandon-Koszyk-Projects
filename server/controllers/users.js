const express = require('express');
const model = require('../models/users');
const { requireLogin } = require('../middleware/authorization');
const router = express.Router();

router
    .get('/', requireLogin(true), (req, res, next) => {
        model.getAll(+req.query.page, +req.query.pageSize) //getAll
            .then(list => {
                const data = {
                    data: list.items,
                    total: list.total,
                    isSuccess: true
                }
                res.send(data);
            }).catch(next);
    })

    .get('/search/:q', requireLogin(), (req, res, next) => { //search
        model.search(req.params.q, +req.query.page, +req.query.pageSize)
            .then(list => {
                const data = {
                    data: list.items,
                    total: list.total,
                    isSuccess: true
                }
                res.send(data);
            }).catch(next);        
    })

    .get('/:id', requireLogin(), (req, res, next) => { //getItemById()
        model.getItemById(req.params.id)
            .then(x => {
                const data = {
                    data: x,
                    isSuccess: true
                };
                res.send(data);
            }).catch(next);
    })
    
    .post('/', (req, res, next) => { //addItem()
        model.addItem(req.body)
            .then(item => {
                const data = {
                    data: item,
                    isSuccess: true
                }
                res.send(data);
            }).catch(next);
    })

    .patch('/:id', requireLogin(true), (req, res, next) => { //updateItem()
        model.updateItem(req.body)
            .then(item => {
                const data = {
                    data: item,
                    isSuccess: true
                }
                res.send(data);
            }).catch(next);
        
    })

    .delete('/:id', requireLogin(true), (req, res, next) => { //deleteItem()
        model.deleteItem(req.params.id) 
            .then(item => {
                const data = {
                    data: item,
                    isSuccess: true
                }
                res.send(data);
            }).catch(next);
    })

    .post('/login', (req, res, next) => {
        model.login(req.body.email, req.body.password)
            .then(x => {
                const data = { data: x, isSuccess: true };
                res.send(data)
            }).catch(next);
    })

    .post('/seed', requireLogin(true), (req, res, next) => {
        model.seed()
            .then(count => {
                const data = {
                    data: count,
                    isSuccess: true
                }
                res.send(data);
            }).catch(next);
    })

module.exports = router;
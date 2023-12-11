
const express = require('express');
const { getAll, get, search, create, update, remove, seed } = require('../models/workouts');
const router = express.Router();

router.get('/', (req, res, next) => {

    getAll()
    .then((workouts) => {
        res.send(workouts);
    })
    .catch(next)

})
.get('/search' , (req, res, next) => {

    search(req.query.q)
    .then((results) => {
        res.send(results);
    }).catch(next);

})
.get('/:id', (req, res, next) => {

  get(+req.params.id)
  .then((workouts) => {
    if(workouts) {
      res.send( workouts );
    }else {
      res.status(404).send({error: 'workout not found'});
    }
  }).catch(next);

})
.post('/', (req, res, next) => {
 
  const { workout } = req.body.body;
  console.log(workout)

    create(workout)
    .then((workout) => {
        res.send(workout);
    }).catch(next);
})
.patch('/:id', (req, res, next) => {
    
      req.body.id = +req.params.id;
      update(req.body)
      .then((workout) => {
          res.send(workout);
      }).catch(next);
  
})
.delete('/:id', (req, res, next) => {
    
      remove(+req.params.id)
      .then(() => {
          res.send({message: 'workout removed'});
      }).catch(next);

})
.post('/seed', (req, res, next) => {

  seed()
  .then(() => {
    res.send({message: 'Workouts seeded'});
  }).catch(next);

})

module.exports = router;
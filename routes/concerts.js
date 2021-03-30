const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
  });

router.route('/concerts/random').get((req, res) => {
    const array = db.concerts;
    res.json(array[Math.floor(Math.random() * array.length)]); 
  });
 
router.route('/concerts/:id').get((req, res) => {
    const id = req.params.id;
    for (let item in db.concerts){
        if(id == db.concerts[item].id){
            res.json(db.concerts[item]);
        }
    }
});

router.route('/concerts').post((req, res) => {
    const newConcert = {
        id: uuidv4(),
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    };
    db.concerts.push(newConcert);
    res.json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
    const concert = db.concerts.find(item => item.id == req.params.id);
    const index = db.concerts.indexOf(concert)
    const change = {
        ...concert,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    }
    db.concerts[index] = change;
    res.json({message: 'OK'})
});

router.route('/concerts/:id').delete((req, res) => {
    const concert = db.concerts.find(item => item.id == req.params.id);
    const index = db.concerts.indexOf(concert);
    db.concerts.splice(index, 1);
    res.json({message: 'OK'});
});

module.exports = router;

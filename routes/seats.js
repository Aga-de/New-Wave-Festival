const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
  });

router.route('/seats/random').get((req, res) => {
    const array = db.seats;
    res.json(array[Math.floor(Math.random() * array.length)]); 
  });
 
router.route('/seats/:id').get((req, res) => {
    const id = req.params.id;
    for (let item in db.seats){
        if(id == db.seats[item].id){
            res.json(db.seats[item]);
        }
    }
});

router.route('/seats').post((req, res) => {
    const newSeat = {
        id: uuidv4(),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    };
    if (db.seats.some(seat => seat.day == newSeat.day && seat.seat == newSeat.seat )) {
        res.json({message: "The slot is already taken..."});
    } else {
        db.seats.push(newSeat);
        res.json({message: 'OK'});
    }
});

router.route('/seats/:id').put((req, res) => {
    const seat = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(seat)
    const change = {
        ...seat,
        day: req.body.day,
        seat: req. body.seat,
        client: req.body.client,
        email: req.body.email,
    }
    db.seats[index] = change;
    res.json({message: 'OK'})
});

router.route('/seats/:id').delete((req, res) => {
    const seat = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(seat);
    db.seats.splice(index, 1);
    res.json({message: 'OK'});
});

module.exports = router;

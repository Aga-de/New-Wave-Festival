const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
  });

router.route('/testimonials/random').get((req, res) => {
    const array = db.testimonials;
    res.json(array[Math.floor(Math.random() * array.length)]); 
  });
 
router.route('/testimonials/:id').get((req, res) => {
    const id = req.params.id;
    for (let item in db.testimonials){
        if(id == db.testimonials[item].id){
            res.json(db.testimonials[item]);
        }
    }
});

router.route('/testimonials').post((req, res) => {
    const newTestimonial = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text
    };
    db.testimonials.push(newTestimonial);
    res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
    const testimonial = db.testimonials.find(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(testimonial)
    const change = {
        ...testimonial,
        author: req.body.author,
        text: req.body.text
    }
    db.testimonials[index] = change;
    res.json({message: 'OK'})
});

router.route('/testimonials/:id').delete((req, res) => {
    const testimonial = db.testimonials.find(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(testimonial);
    db.testimonials.splice(index, 1);
    res.json({message: 'OK'});
});

module.exports = router;
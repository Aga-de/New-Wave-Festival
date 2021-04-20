const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server');
const Concert = require('../../../concert.model');

chai.use(chaiHttp);

const expect =  require('chai').expect;
const request = require('chai').request;

describe('GET /concerts', () => {

    before(async () => {
        const oneConcert = new Concert({ 
            _id: '5d9f1140f10a81216cfd4567',
            performer: 'John Doe', 
            genre: 'Rock', 
            price: 25, 
            day: 1, 
            image: '/img/uploads/1fsd324fsdg.jpg' });
        await oneConcert.save();
      
        const twoConcert = new Concert({ 
            _id: '5d9f1140f10a81216cfd4987',
            performer: 'Lala Lala', 
            genre: 'Jazz', 
            price: 9, 
            day: 1, 
            image: '/img/uploads/1fsd324fsdg.jpg' });
        await twoConcert.save();
      });

    it('/ should return all concerts', async () => {

        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);

    });
  
    it('/:id should return one concert by :id ', async () => {

        const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4567');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;

    });
  
    it('/random should return one random concert', async () => {

        const res = await request(server).get('/api/concerts/random');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
  
    });

    it('/performer/:performer should return matching performer concert', async () => {
        const res = await request(server).get('/api/concerts/performer/John Doe');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
    });

    it('/genre/:genre should return matching genre concert', async () => {
        const res = await request(server).get('/api/concerts/genre/Rock');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
    });

    it('/day/:day should return matching day concert', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
    });

    it('/price/:price_min/:price_max should return matching price range ', async () => {
        const res = await request(server).get('/api/concerts/price/10/30');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
    });

    after(async () => {
        await Concert.deleteMany();
      });
  
  });
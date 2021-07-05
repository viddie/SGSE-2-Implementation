process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let message = require('../models/message');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('messages', () => {
    beforeEach((done) => {
        message.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET messages', () => {
      it('it should GET all the messages', (done) => {
        chai.request(server)
            .get('/messages')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
});
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var server = require('supertest');
var assert = require('assert'); // node native assertion
process.env.NODE_ENV = 'test'; // in test env app will connect to test database

// simple test sample
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

// use chai-http for request
chai.use(chaiHttp);
describe('test', function () {
    it('should return start page', function (done) {
        chai.request(server)
            .get('/')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should return start page', function (done) {
        chai.request(server)
            .post('/api/signup')
            .send({email: 'rasoolmail93@gmail.com', password: 'password'})
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });

});
var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {
    describe('health', function() {
        describe('GET /health', function() {
            it('should return a default status', function(done) {

                request(server)
                    .get('/health')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.eql('System health is good, status = UNKNOWN');

                        done();
                    });
            });

            it('should accept a status parameter', function(done) {

                request(server)
                    .get('/health')
                    .query({ status: 'test' })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.eql('System health is good, status = test');

                        done();
                    });
            });
        });
    });
});
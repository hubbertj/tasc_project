var should = require('should');
var request = require('supertest');
var server = require('../../../app');
const basePath = '/api/v1';

describe('controllers', function() {
    describe('health', function() {
        describe('GET /health', function() {
            it('should return a default status without status passed in', function(done) {
                request(server)
                    .get(basePath + '/health')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);

                        res.body.should.eql('System health is good, status = UNKNOWN');

                        done();
                    });
            });
            it('should accept a status parameter and repeat it back', function(done) {
                request(server)
                    .get(basePath + '/health')
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
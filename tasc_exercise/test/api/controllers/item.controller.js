var should = require('should');
var request = require('supertest');
var server = require('../../../app');
const swaggerPath = 'api/swagger/swagger.yaml';
const readYaml = require('read-yaml');

new Promise(function(aResolve, aReject) {
    readYaml(swaggerPath, function(err, data) {
        if (err) return aReject(err);
        return aResolve(data);
    });
}).then((swaggerApiSettings) => {
    describe('controllers', function() {
        describe('item', function() {
            describe('GET /health', function() {
                it('should return a item from a itemID', function(done) {
                    request(server)
                        .get(swaggerApiSettings.basePath + '/health')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);

                            res.body.should.eql('System health is good, status = UNKNOWN');
                            done();
                        });
                });
                it('should be able to modify a item', function(done) {
                    request(server)
                        .get(swaggerApiSettings.basePath + '/health')
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
                it('should delete a item from the system', function(done) {
                    request(server)
                        .get(swaggerApiSettings.basePath + '/health')
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
}).catch((err) => {
    console.error(err);
});
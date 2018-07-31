var should = require('should');
var request = require('supertest');
var server = require('../../../app');
const swaggerPath = 'api/swagger/swagger.yaml';
const readYaml = require('read-yaml');

const checkoutPostData = [{
        "quantity": 5,
        "ItemId": 1
    },
    {
        "quantity": 4,
        "ItemId": 2
    }, {
        "quantity": 5,
        "ItemId": 3
    }
];

new Promise(function(aResolve, aReject) {
    readYaml(swaggerPath, function(err, data) {
        if (err) return aReject(err);
        return aResolve(data);
    });
}).then((swaggerApiSettings) => {

    describe('controllers', function() {
        describe('checkout', function() {
            describe('POST /checkout', function() {
                it('should accept items and return a transaction', function(done) {
                    request(server)
                        .post(swaggerApiSettings.basePath + '/checkout')
                        .send(checkoutPostData)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);

                            res.body.should.have.property('id').which.is.a.Number();
                            res.body.should.have.property('subTotal').which.is.a.Number();
                            res.body.should.have.property('tax').which.is.a.Number();
                            res.body.should.have.property('total').which.is.a.Number();
                            res.body.should.have.property('items').which.is.a.Array();

                            done();
                        });
                });

                it('should get a transaction', function(done) {
                    request(server)
                        .get(swaggerApiSettings.basePath + '/checkout/1')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);

                            res.body.should.have.property('id').which.is.a.Number();
                            res.body.should.have.property('subTotal').which.is.a.Number();
                            res.body.should.have.property('tax').which.is.a.Number();
                            res.body.should.have.property('total').which.is.a.Number();
                            res.body.should.have.property('items').which.is.a.Array();

                            done();
                        });
                });
            });
        });
    });
}).catch((err) => {
    console.error(err);
});


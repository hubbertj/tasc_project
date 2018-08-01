var should = require('should');
var request = require('supertest');
var server = require('../../../app');
const swaggerPath = 'api/swagger/swagger.yaml';
const readYaml = require('read-yaml');

var stubItem = {
    "name": "testItem",
    "import": false,
    "except": true,
    "type": "",
    "price": 99.99,
};

new Promise(function(aResolve, aReject) {
    readYaml(swaggerPath, function(err, data) {
        if (err) return aReject(err);
        return aResolve(data);
    });
}).then((swaggerApiSettings) => {
    describe('controllers', function() {
        describe('item', function() {
            describe('GET /item/{itemId}', function() {
                it('should return a item from a itemId', function(done) {
                    request(server)
                        .get(swaggerApiSettings.basePath + '/item/' + 1)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            should.not.exist(err);

                            res.body.should.have.property('id').which.is.a.Number();
                            res.body.should.have.property('name').which.is.a.String();
                            res.body.should.have.property('import').which.is.a.Boolean();
                            res.body.should.have.property('except').which.is.a.Boolean();
                            res.body.should.have.property('type').which.is.a.String();
                            res.body.should.have.property('price').which.is.a.Number();
                            done();
                        });
                });
                it('should be able to (add / delete) a item.', function(done) {
                    new Promise((resolve, reject) => {
                            request(server)
                                .post(swaggerApiSettings.basePath + '/item')
                                .send(stubItem)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(err, res) {
                                    should.not.exist(err);

                                    res.body.should.have.property('id').which.is.a.Number();
                                    res.body.should.have.property('name').which.is.a.String();
                                    res.body.should.have.property('import').which.is.a.Boolean();
                                    res.body.should.have.property('except').which.is.a.Boolean();
                                    res.body.should.have.property('type').which.is.a.String();
                                    res.body.should.have.property('price').which.is.a.Number();
                                    return resolve(res.body);
                                });

                        })
                        .then((item) => {
                            request(server)
                                .delete(swaggerApiSettings.basePath + '/item/' + item.id)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(err, res) {
                                    should.not.exist(err);
                                    done();
                                });
                        })
                        .catch(err => console.error(err));

                });
                it('should be able to (add / modify / delete) a item', function(done) {

                    new Promise((resolve, reject) => {
                            request(server)
                                .post(swaggerApiSettings.basePath + '/item')
                                .send(stubItem)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(err, res) {
                                    should.not.exist(err);

                                    res.body.should.have.property('id').which.is.a.Number();
                                    res.body.should.have.property('name').which.is.a.String();
                                    res.body.should.have.property('import').which.is.a.Boolean();
                                    res.body.should.have.property('except').which.is.a.Boolean();
                                    res.body.should.have.property('type').which.is.a.String();
                                    res.body.should.have.property('price').which.is.a.Number();

                                    res.body.price.should.eql(99.99);
                                    return resolve(res.body);
                                });

                        })
                        .then((newItem) => {
                            if (newItem && 'price' in newItem) {
                                newItem.price = 1.99;
                            }

                            return new Promise((resolve, reject) => {
                                request(server)
                                    .put(swaggerApiSettings.basePath + '/item')
                                    .send(newItem)
                                    .set('Accept', 'application/json')
                                    .expect('Content-Type', /json/)
                                    .expect(200)
                                    .end(function(err, res) {
                                        should.not.exist(err);

                                        res.body.should.have.property('id').which.is.a.Number();
                                        res.body.should.have.property('name').which.is.a.String();
                                        res.body.should.have.property('import').which.is.a.Boolean();
                                        res.body.should.have.property('except').which.is.a.Boolean();
                                        res.body.should.have.property('type').which.is.a.String();
                                        res.body.should.have.property('price').which.is.a.Number();

                                        res.body.price.should.eql(1.99);
                                        return resolve(res.body);
                                    });

                            });
                        })
                        .then((modItem) => {
                            request(server)
                                .delete(swaggerApiSettings.basePath + '/item/' + modItem.id)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(err, res) {
                                    should.not.exist(err);
                                    done();
                                });
                        }).catch(err => console.error(err));
                });
            });
        });
    });
}).catch((err) => {
    console.error(err);
});
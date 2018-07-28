'use strict';

const SwaggerExpress = require('swagger-express-mw');
const swaggerUi = require('swagger-tools/middleware/swagger-ui');
const app = require('express')();
const express = require('express');
const FRONTEND_DIR = __dirname + '/public/checkout-app/dist/checkout-app';
module.exports = app; // for testing

var config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }
    let port = process.env.PORT || 10010;

    // swagger ui 
    app.use(swaggerUi(swaggerExpress.runner.swagger));

    //exposes the public dir
    app.use(express.static(FRONTEND_DIR));

    // install middleware
    swaggerExpress.register(app);


    app.listen(port);

    console.log('\nSwagger-ui http://127.0.0.1:' + port + '/docs');
    console.log('Frontend Checkout webapp  http://127.0.0.1:' + port + '/');

    if (swaggerExpress.runner.swagger.paths['/health']) {
        console.log('try this:\ncurl -X GET --header \'Accept: application/json\' \'http://localhost:'+ port +'/api/v1/health?status=check\'');

    }
});
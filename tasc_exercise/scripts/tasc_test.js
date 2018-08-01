'use strict';
/*  Title: Tasc Test
    Author:  Jerum Hubbert
    Date: Aug 01 2018
    Comment: 
        This script should print out a receipt for a define transaction in the README.
        process:
            - creates the server.
            - gets the list of items from the backend.
            - gets the itemId of the items we want to purhcase.
            - submits a transaction to the backend.
            - prints to console a receipt for the transaction.
            - ends node process.
*/

const request = require('supertest');
const server = require('../app');
const swaggerPath = 'api/swagger/swagger.yaml';
const readYaml = require('read-yaml');

//helper functions.
var printReceiptToConsole = function(response){
    console.log(JSON.stringify(response));
};

// The list of the items to purhcase;
let shoppingList1 = [
    { name: "16lb bag of skittles", qty: 1 },
    { name: "walkman", qty: 1 },
    { name: "bag of microwave popcorn", qty: 1 }
];

let shoppingList2 = [
    { name: "bag of vanilla-hazelnut coffee", qty: 1 },
    { name: "vespa", qty: 1 }
];

let shoppingList3 = [
    { name: "crate of almond snickers", qty: 1 },
    { name: "discman", qty: 1 },
    { name: "bottle of wine", qty: 1 },
    { name: "bag of fair-trade coffee", qty: 1 }
];


// main block
(function(shoppingLists) {
    var swaggerApiSettings = null;

    new Promise(function(aResolve, aReject) {
            readYaml(swaggerPath, function(err, data) {
                if (err) return aReject(err);
                return aResolve(data);
            });
        })
        .then((sas) => {
            swaggerApiSettings = sas;
            return new Promise((resolve, reject) => {
                request(server)
                    .get(swaggerApiSettings.basePath + '/item/getAll')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return reject(err);
                        return resolve(res.body);
                    });
            });
        })
        .then((list) => {
            let transList = [];
            let promises = [];

            shoppingLists.forEach((shoppingList) => {
                let orderList = [];
                shoppingList.forEach((item) => {
                    var foundItem = list.find(aItem => item.name.toLowerCase() === aItem.name.toLowerCase());
                    if (foundItem) {
                        orderList.push({ ItemId: foundItem.id, quantity: item.qty })
                    }
                });
                transList.push(orderList);
            });

            transList.forEach((trans) => {
                promises.push(new Promise((resolve, reject) => {
                    request(server)
                        .post(swaggerApiSettings.basePath + '/checkout')
                        .send(trans)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return reject(err);
                            return resolve(res.body);
                        });
                }));
            });
            return Promise.all(promises);
        })
        .then((response) => {
            printReceiptToConsole(response);
            process.exit();
        })
        .catch((err) => {
            console.error(err);
            process.exit();
        });

})([shoppingList1, shoppingList2, shoppingList3]);

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
*/
const request = require('supertest');
const server = require('../app');
const swaggerPath = 'api/swagger/swagger.yaml';
const readYaml = require('read-yaml');

// The list of the items to purhcase;
let shoppingList1 = [{
        name: "16lb bag of skittles",
        qty: 1
    },
    {
        name: "walkman",
        qty: 1
    },
    {
        name: "bag of microwave popcorn",
        qty: 1
    }
];

let shoppingList2 = [{
        name: "bag of vanilla-hazelnut coffee",
        qty: 1
    },
    {
        name: "vespa",
        qty: 1
    }
];

let shoppingList3 = [{
        name: "crate of almond snickers",
        qty: 1
    },
    {
        name: "discman",
        qty: 1
    },
    {
        name: "bottle of wine",
        qty: 1
    },
    {
        name: "bag of fair-trade coffee",
        qty: 1
    }
];

(function(list1, list2, list3) {
    let itemList = [];
    new Promise(function(aResolve, aReject) {
            readYaml(swaggerPath, function(err, data) {
                if (err) return aReject(err);
                return aResolve(data);
            });
        })
        .then((swaggerApiSettings) => {
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
        	if(list && list.length > 0){
        		itemList = list;
        	}
            console.log(itemList);
            // console.log(list1, list2, list3);
            process.exit();
        })
        .catch((err) => {
            console.error(err);
        });

})(shoppingList1, shoppingList2, shoppingList3);



//get the date we need from the json database files.
//create the server.
//run a health test to make sure the server is up.
//run a /checkout with the items we want.
//create a receipt from the date we get back.
//
//
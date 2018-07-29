## TASC Project
This is a test project for the TASC Company.

#### Requirements

#### Guidelines
---
The goal of this assessment is to validate your ability to create a high quality, production
ready application including unit tests that meets the stated requirements.

* The solution should be implemented in Typescript or ES6 (Node.js).
* It is preferred that you write the output to stdout. 
* Best Coding and Design Practices are required.

#### Problem Statement
---
1.	Basic sales tax is applicable at a rate of 10% on all goods, except candy, popcorn and coffee, which are exempt.
2.	Import duty is an additional sales tax applicable on all imported goods at a rate of 5%, with no exemptions.
3.	When items are purchased a receipt is produced which lists the name of all the items and their price (including tax), finishing with the total cost of the items, and the total amounts of sales taxes paid.
4.	Sales tax is rounded up to the nearest multiple of $0.05. This rounding is done by item, by type of tax (basic sales and import duty)
5.	Write an application that persists or prints out the receipt details for these shopping baskets.

__Input__ 
<br>
&nbsp;__Shopping Basket 1:__
<br>
&nbsp;&nbsp;1 16lb bag of Skittles at 16.00<br>
&nbsp;&nbsp;1 Walkman at 99.99<br>
&nbsp;&nbsp;1 bag of microwave Popcorn at 0.99<br>

&nbsp;__Shopping Basket 2:__
<br>
&nbsp;&nbsp;1 imported bag of Vanilla-Hazelnut Coffee at 11.00<br>
&nbsp;&nbsp;1 Imported Vespa at 15,001.25<br>

&nbsp;__Shopping Basket 3:__
<br>
&nbsp;&nbsp;1 imported crate of Almond Snickers at 75.99<br>
&nbsp;&nbsp;1 Discman at 55.00<br>
&nbsp;&nbsp;1 Imported Bottle of Wine at 10.00<br>
&nbsp;&nbsp;1 300# bag of Fair-Trade Coffee at 997.99<br>

__Output__
<br>
&nbsp;__Output 1:__
<br>
&nbsp;&nbsp;1 16lb bag of Skittles: 16.00<br>
&nbsp;&nbsp;1 Walkman: 109.99<br>
&nbsp;&nbsp;1 bag of microwave Popcorn: 0.99<br>
&nbsp;&nbsp;Sales Taxes: 10.00<br>

#### How to run the install and run project
***
1. install the packages
`npm install`
2. optional - install swagger globally
`npm install -g swagger`
- Now you can run the project is development with
`swagger project start`

or

1. install the packages
`npm install`
2. Run the project like a native node application
`npm start`
This will:
* compile the angular frontend
* start the project `node app.js`

#### How to run backend and frontend unit tests
***






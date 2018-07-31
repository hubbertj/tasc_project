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

> or

1. install the packages<br>
`npm install`<br>
2. Run the project like a native node application<br>
`npm start`<br>
> __This will:__<br>
> Compile the angular frontend<br>
> Start the project <br>`node app.js`<br>

## UNIT Testing
This is how to run the backend and frontend unit test.

The backend unit testing is accomlished by using the standard [Should][1] & [Supertest][2] npm libaries.<br>
The frontend unit testing is accomlished by using the native angular cli generated angular > 2 style 
which uses the [Jasmine][3] & [Karma][4].

__Backend unit testing__
1. install the packages<br>
`npm install`<br>
2. Optional - install swagger globally
`npm install -g swagger`
3. Then run a<br>
`swagger project test`

> or

&#09;&#09;3a. After a `npm install` just run<br>
`npm run test-backend`
- This will run a `swagger project test` for you.

__Frontend unit testing__
1. install the packages<br>
`npm install`<br>
2. install the packages<br>
`npm run test-frontend`<br>





















[1]: https://www.npmjs.com/package/should
[2]: https://www.npmjs.com/package/supertest
[3]: https://www.npmjs.com/package/jasmine
[4]: https://www.npmjs.com/package/karma






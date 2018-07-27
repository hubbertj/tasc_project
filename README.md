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

<h6><u>Input</u><h6>
..Shopping Basket 1:
....1 16lb bag of Skittles at 16.00
....1 Walkman at 99.99
....1 bag of microwave Popcorn at 0.99

..<b>Shopping Basket 2:</b>
....1 imported bag of Vanilla-Hazelnut Coffee at 11.00
....1 Imported Vespa at 15,001.25

..<b>Shopping Basket 3:</b>
....1 imported crate of Almond Snickers at 75.99
....1 Discman at 55.00
....1 Imported Bottle of Wine at 10.00
....1 300# bag of Fair-Trade Coffee at 997.99

<h6><u>Output</u><h6>
..<b>Output 1:</b>
....1 16lb bag of Skittles: 16.00
....1 Walkman: 109.99
....1 bag of microwave Popcorn: 0.99
....Sales Taxes: 10.00



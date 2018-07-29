# stocktrader
an app to buy stocks of various exchange via an API

*application only for assessment purposes*

## Installation

Quickly describe how to install your project and how to get it running

1. Install Node dependencies

        npm install -g
  

## Usage
 
       run 'stocktrader' 
       command from any command line or terminal window of choice after install

This project uses postgres 9 and above. Install postgres, then Create a postgres database and name it as you wish. "MYDB" for example. You will need the user name and password and connection port.

use any program of choice to populate table with test values

    +--------------+--------------+----------+-------+---------------------------+
    | company_id   | country      | budget   | bid   | category                  |
    |--------------+--------------+----------+-------+---------------------------|
    | H1           | ['IN']       | 1.00     | 0.10  | ['*******']               |
    +--------------+--------------+----------+-------+---------------------------+


enter postgres username, password, db_name, and port on the db.js file before running.

alternatively these values can be entered in a .env on the root folder

please insert sample data into table prior testing. budget and bid data field uses a data type numeric for proper
currency handling while country and category uses arrays for multiple entries.
  
      insert into stock_details (company_id,country,budget,bid,category) values ('C1','{"US","FR"}',1,0.10,'{"automobile","finance"}');

category names are assumes to be in all small cases during insert. insurance not Insurance



The appplication generates a log with sample as seen below:

   Sun Jul 29 2018 16:26:55 GMT+0100 (W. Central Africa Standard Time):BudgetCheck:{C1,'Passed'},{C3,'Passed'}.
   Sun Jul 29 2018 16:26:56 GMT+0100 (W. Central Africa Standard Time):BaseBid:{C3,'Passed'}.
   Sun Jul 29 2018 16:26:56 GMT+0100 (W. Central Africa Standard Time):Winner:C3.


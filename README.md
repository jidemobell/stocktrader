# stocktrader
an app to buy stocks of various exchange via an API


## Installation

Quickly describe how to install your project and how to get it running

1. Install Node dependencies

        npm install
  

## Usage
 
       run 'stocktrader' command from any command line or terminal window of choice after install

This project uses postgres 9 and above. Install postgres, then Create a postgres database and name it as you wish. "MYDB" for example. You will need the user name and password and connection port.

use any program of choice to populate table with test values

    +--------------+--------------+----------+-------+---------------------------+
    | company_id   | country      | budget   | bid   | category                  |
    |--------------+--------------+----------+-------+---------------------------|
    | H1           | ['IN']       | 1.00     | 0.10  | ['*******']               |
    +--------------+--------------+----------+-------+---------------------------+

Create environment variables in .env file in the root folder of your project and include the following details

- PG_HOST=localhost
- PG_USER=*database username*
- PG_KEY=*database password*
- PG_DBASE=MYDB
- PG_PORT=5432 *postgres port number*
  
These parameters may also be entered directly inside the config file.


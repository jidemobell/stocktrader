# stocktrader
an app to buy stocks of various exchange via an API


## Installation

Quickly describe how to install your project and how to get it running

1. Install Node dependencies

        npm install
  

## Usage
 
* run 'stocktrader' command from any command or terminal windor of choice after install

This project uses postgres 9 and above. Install postgres, then Create a postgres database and name it as you wish. "MYDB" for example. You will need the user name and password for this and connection port.

Create environmental variables in .env file in the root folder of your project

* PG_HOST=localhost
* PG_USER=*database username*
* PG_KEY=*database password*
* PG_DBASE=MYDB
* PG_PORT=5432 *postgres port number*
  *these params can also be set inside the db file*


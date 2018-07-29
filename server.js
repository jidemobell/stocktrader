#!/usr/bin/env node
const cluster = require('cluster');
const figlet  = require('figlet');
const chalk   = require('chalk');
const {init} = require('./libs/Program/program')



console.log(
    chalk.yellow(
      figlet.textSync('StockTrader', { horizontalLayout: 'default', verticalLayout: 'default' })
    )
 );

    
init();

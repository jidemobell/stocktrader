#!/usr/bin/env node
const cluster = require('cluster');
const os = require('os')


// if (cluster.isMaster) {
//   for (var i = 0; i < os.cpus().length; i += 1) {
//     cluster.fork();
//   }

//   // When process dies, replace it.
//   cluster.on('exit', function () {
//     cluster.fork();
//   });

//   return;
// }else{
  const figlet  = require('figlet');
  const chalk   = require('chalk');
  const {init} = require('./libs/Program/program')


  console.log(
    chalk.yellow(
      figlet.textSync('StockTrader', { horizontalLayout: 'default', verticalLayout: 'default' })
    )
 );

    
init();
// }




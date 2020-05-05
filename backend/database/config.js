'use strict';

module.exports = {
  production: {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'myball',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: 'Gaoxin123',
  },
  test: {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'myball',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: 'Gaoxin123',
  },
  development: {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'tftimyballme',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: 'Gaoxin123',
  },
};

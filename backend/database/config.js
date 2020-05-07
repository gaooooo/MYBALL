'use strict';

module.exports = {
  production: {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'myball',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: '8D8FDBF4253B2C49E823141CEE57E009',
  },
  test: {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'myball',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: '8D8FDBF4253B2C49E823141CEE57E009',
  },
  development: {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    database: 'tftimyballme',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: '8D8FDBF4253B2C49E823141CEE57E009',
  },
};

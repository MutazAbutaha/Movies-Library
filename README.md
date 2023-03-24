# Movies-Library



**Author Name**: Mutaz Abutaha

## WRRC

### Lab11 WRRC
![Lab11 image](./Movie%20Data/Lab11.png)

### Lab12 WRRC
![Lab12 image](./Movie%20Data/Lab12.png)

## Lab13 WRRC 
![Lab13 image](./Movie%20Data/Lab13.png)

## Overview

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
* npm init -y
* npm inistall express nodemon dotenv cors axios
* const express = require('express');
* const cors = require('cors');
* const axios = require('axios');
* require('dotenv').config()
* const app = express();
* app.use(cors());
* const port = 3000;
* creat routs (app.get('/home', homeHandler))
* create function to the home page handler
* create function to the favorite page handler
* call the functions by create new request from the thunder 
* create new routs
* create new functions 
* app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)})
## DataBase Stage :
* go inside your database shell : - server is running sqlstart - psql
* create DataBase (CREATE DATABASE databasename);
* create a new table : inside schema.sql file :
    CREATE TABLE table_name ( 
    column1 VARCHAR(),
    column2 VARCHAR(),
    column3 VARCHAR() );
*  connect my table to my database psql  -d databasename -f schema.sql
* IN my server : npm install pg
* In index.js:
const url="postgres://username:password@localhost:5432/databaseName" // store it in the .env file
// create a new client instance//
const { Client } = require('pg')
const client = new Client(url)
* Connect to DataBase :
client.connect().then(() => {

    app.listen(PORT, () => {
        console.log(`Server is listening ${PORT}`);
    });
})
* do CRUD by using client.query();
  



## Project Features
<!-- What are the features included in you app -->
* when you send request to the home page by get method you will response the json data filtered in new array 
* when you send request to the favorit page by get method you will response Welcome to Favorite Page 
* Now i have alot of routs like (trending, search, popular, nowPlaying,...)
* Now i can add a new tables  to my dataBase 
* and i can get my data from dataBase

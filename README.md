# Movies-Library



**Author Name**: Mutaz Abutaha

## WRRC

### Lab11 WRRC
![Lab11 image](./Lab11.png)

### Lab12 WRRC
![Lab12 image](./Lab12.png)

## Lab13 WRRC 
![Lab13 image](./Lab13.png)

## Lab14 WRRC
![Lab14 image](./Lab14.png)

## Overview

## Getting Started
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

## CRUD APPLICATION 
* Create (post) (`INSERT INTO Movie (...)
    VALUES (...) RETURNING *; `)
    client.query(sql,values).then((result)=>{
        res.status(201).json(result.rows)}).
* Read (get) ( `SELECT * FROM movie;`)
    client.query(sql).then((result)=>{
        res.json(result.rows)})
* Update (put) (`UPDATE Movie SET comments = $1
     WHERE id = $2 RETURNING *;`)  
     client.query(sql,values).then(result=>{
        res.send(result.rows) })
* Delete (delete) (`DELETE FROM Movie WHERE 
    id = $1;`)  
     client.query(sql,value).then(result=>{
        res.status(204).send("deleted");})

## Deploy Project Vercel
* First, add a new property called engines to your `package.json` file
"engines": {
    "node": "14.x"
  }
* Second, create a new file called `vercel.json` and add the following to it
{"version": 2,
    "builds": [
       { "src": "./index.js", "use": "@vercel/node" }
    ],
    "routes": [
       { "src": "/(.*)", "dest": "/" }
    ]
 }
* Now, you can start the process:
1. Go to https://www.vercel.com/
2. create new account and it's gonna ask you to authorize vercel to your Github account
3. From your dashboard, click on `Add new+` then choose `project` from the drop down list
4. Under `Import Git Repository`, choose the repo that you want to deploy, then click on `import`
5. Make everything as default, and you can add your environment variables if you have any
6. click on `Deploy` (edited) 

## database deployment :
* Deploy the database using ElephantSQL
*  go to https://www.elephantsql.com/
* create a new account
* click on + Create New Instance in order to create a new database.
* Add the database name in the Name field, and keep the rest as default
*  Click on Select Region, then choose the server that you would like to create our database in. We recommend   selecting the closet server to you geographically.
* Click on Review
* Click on Create Instance
* Click on your new created database so you can get the URL of your database and add it as environment variable to your deployed node app on  Vercel.
  
## Project Features
* when you send request to the home page by get method you will response the json data filtered in new array 
* when you send request to the favorit page by get method you will response Welcome to Favorite Page 
* Now i have alot of routs like (trending, search, popular, nowPlaying,...)
* Now I can add a new tables  to my dataBase 
* I can add a new data to my dataBase
* I can get my data from dataBase
* I can update my data from dataBase
* I can delete my data from dataBase

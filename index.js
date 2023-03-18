'use strict';

const express = require('express')
const dataJson = require('./Movie Data/data.json')
const app = express()
const port = 3000

app.get('/', homePageHandler);
app.get('/favorite', favoritePageHandler);

function homePageHandler(req, res){
    let result=[];
    let newJson = new DataJson(dataJson.title,dataJson.poster_path,dataJson.overview);
    result.push(newJson);
    res.json(result);
}

function DataJson(title,poster_path,overview ){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}

function favoritePageHandler(req, res){
    res.send('Welcome to Favorite Page');
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
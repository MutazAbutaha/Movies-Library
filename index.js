'use strict';

const express = require('express');
const dataJson = require('./Movie Data/data.json');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const apiKey = process.env.APIKEY;


app.get('/', homePageHandler);
app.get('/favorite', favoritePageHandler);
app.get('/trending', trendingPageHandler);
app.get('/search', searchHandler);
app.get('/popular', popularHandler);
app.get('/nowPlaying', nowPlayingHandler);
app.get('*', handelNotFoundError);



function homePageHandler(req, res){
    let result=[];
    let newJson = new DataJson(dataJson.title,dataJson.poster_path,dataJson.overview);
    result.push(newJson);
    res.json(result);
}


function favoritePageHandler(req, res){
    res.send('Welcome to Favorite Page');
}

function handelNotFoundError(req, res){
    res.status(404).send('Not Found');
}

function trendingPageHandler(req, res){
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
    axios.get(url)
    .then((result)=>{
        console.log(result.data.results);
        let dataTrending = result.data.results.map((i)=>{
            return new Trending(i.id, i.title, i.release_date, i.poster_path, i.overview);
        })
        res.json(dataTrending);
    })
    .catch((error)=>{
        console.log(error);
    })
}

function searchHandler(req, res){
    let movieName = req.query.name
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`;
    axios.get(url)
    .then((result)=>{
        let response = result.data.results
        res.json(response);
    })
    .catch((error)=>{
        console.log(error)
    })

}   

function nowPlayingHandler(req, res){
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`;
    axios.get(url)
    .then((result)=>{
        res.json(result.data.results);
    })
    .catch((error)=>{
        console.log(error)
    })
}
function popularHandler(req, res){
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
    axios.get(url)
    .then((result)=>{
        res.json(result.data.results);
    })
    .catch((error)=>{
        console.log(error);
    })
}
function Trending(id,title,release_date,poster_path,overview){
    this.id=id;
    this.title=title;
    this.release_date=release_date;
    this.poster_path=poster_path;
    this.overview=overview;
}
function DataJson(title,poster_path,overview ){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
});
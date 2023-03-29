'use strict';

//DECLARATION
const express = require('express');
const dataJson = require('./data.json');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT;
const apiKey = process.env.APIKEY;
let url = process.env.URL;
const { Client } = require('pg');
const client = new Client(url);


//ROUTS
app.get('/', homePageHandler);
app.get('/favorite', favoritePageHandler);
app.get('/trending', trendingPageHandler);
app.get('/search', searchHandler);
app.get('/popular', popularHandler);
app.get('/nowPlaying', nowPlayingHandler);
app.post('/addMovie', addMovieHandler);
app.get('/getMovies', getMoviesHandler);
app.put('/UPDATE/:id', updateCommentsHandler);
app.delete('/DELETE/:id', deleteMovieHandler);
app.get('/getMovie/:id', getMovieIdHandler);
app.get('*', handelNotFoundError);
app.use(errorHandler);


//CONSTRUCTORS
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

//FUNCTIONS
function homePageHandler(req,res){
    let result=[];
    let newJson = new DataJson(dataJson.title,dataJson.poster_path,dataJson.overview);
    result.push(newJson);
    res.json(result);
}


function favoritePageHandler(req,res){
    res.send('Welcome to Favorite Page');
}


function trendingPageHandler(req,res){
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
        errorHandler(error,req,res)
    })
}

function searchHandler(req,res){
    let movieName = req.query.name
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`;
    axios.get(url)
    .then((result)=>{
        let response = result.data.results
        res.json(response);
    })
    .catch((error)=>{
        errorHandler(error,req,res)
    })

}   

function nowPlayingHandler(req,res){
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`;
    axios.get(url)
    .then((result)=>{
        res.json(result.data.results);
    })
    .catch((error)=>{
        errorHandler(error,req,res)
    })
}
function popularHandler(req,res){
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
    axios.get(url)
    .then((result)=>{
        res.json(result.data.results);
    })
    .catch((error)=>{
        errorHandler(error,req,res);
    })
}

function addMovieHandler(req, res){
    console.log(req.body);
    // res.send('Data recieved');
    let {title,poster_path,overView,comments}= req.body;
    console.log(title,poster_path,overView,comments);
    let sql = `INSERT INTO Movie (title, poster_path, overView, comments)
    VALUES ($1,$2,$3,$4) RETURNING *; `
    let values = [title,poster_path,overView,comments];
    client.query(sql,values).then((result)=>{
        console.log(result.rows)
        // res.status(201).send("data successfully saved in db to server")
        res.status(201).json(result.rows)
   
}).catch((error)=>{
        errorHandler(error,req,res);
    })
    
}

function getMoviesHandler(req,res){
    let sql =`SELECT * FROM movie;`;
    client.query(sql).then((result)=>{
        console.log(result)
        res.json(result.rows)
    }).catch((error)=>{
        errorHandler(error,req,res);
    })
}

function updateCommentsHandler(req,res){
    let id = req.params.id // params
    let comments = req.body.comments;
    let sql=`UPDATE Movie SET comments = $1 WHERE id = $2 RETURNING *;`;
    let values = [comments,id];
    client.query(sql,values).then(result=>{
        console.log(result.rows);
        res.send(result.rows)
    }).catch((error)=>{
        errorHandler(error,req,res);
    })
}

function deleteMovieHandler(req,res){
    let id = req.params.id; 
    let sql=`DELETE FROM Movie WHERE id = $1;` ;
    let value = [id];
    client.query(sql,value).then(result=>{
        res.status(204).send("deleted");
    }).catch((error)=>{
        errorHandler(error,req,res);
    })

}

function getMovieIdHandler(req,res){
    let id = req.params.id;
    let sql =`SELECT * FROM Movie WHERE id = $1;`;
    let value = [id];
    client.query(sql,value).then((result)=>{
        res.json(result.rows)
    }).catch((error)=>{
        errorHandler(error,req,res);
    })
}
function handelNotFoundError(req,res){
    res.status(404).send('Not Found');
}

function errorHandler(err,req,res){
    res.status(500).send(err);
}

client.connect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on port${PORT}`);
    })


}).catch()



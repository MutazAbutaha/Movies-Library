# Movies-Library



**Author Name**: Mutaz Abutaha

## WRRC

#Lab11 WRRC
![Lab11 image](./Movie%20Data/Lab11.png)

#Lab12 WRRC
![Lab12 image](./Movie%20Data/Lab12.png)

## Overview

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
1. npm init -y
2. npm inistall express nodemon dotenv cors axios
3. const express = require('express');
4. const cors = require('cors');
5. const axios = require('axios');
6. require('dotenv').config()
7. const app = express();
8. app.use(cors());
9. const port = 3000;
10. create function to the home page handler
11. create function to the favorite page handler
12. call the functions by create new request from the thunder 
13. create new functions 
14. call the new functions app.get('/', the function)
15. app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)})

## Project Features
<!-- What are the features included in you app -->
1. when you send request to the home page by get method you will response the json data filtered in new array 
2. when you send request to the favorit page by get method you will response Welcome to Favorite Page 
3. Now i have alot of routs like (trending, search, popular, nowPlaying,...)

//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
const path = require('path')
app.listen(8080);
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "dist/lab9tasks")));
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll); //changed
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll); //changed
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
//lab tasks endpoints
app.delete('/movie/:aTitle', movies.deleteOne);
app.delete('/actors/:id/deleteactormovie', actors.deleteActorWithMovie);
app.delete('/actors/:aId/delmovie/:mId', actors.deleteMovieInActor);
app.delete('/movies/:mId/delactor/:aId', movies.deleteActorInMovie);
app.post('/movies/:mId/actors/:actorId', movies.addActor);
app.delete('/movies/delmoviebetween/:year1/:year2', movies.deleteMovieBetweenYear);

app.get('/movie/actor/:id', movies.getMovieActorCount);
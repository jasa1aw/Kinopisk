const mongoose = require('mongoose');

const FilmSchema =  new mongoose.Schema({
    titleRus: String,
    titleEng: String,
    year: Number,
    time: String,
    country: String,
    genre: String,
    filmImg: String,
});

module.exports = mongoose.model('film', FilmSchema)
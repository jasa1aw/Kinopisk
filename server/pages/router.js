const express = require('express');
const router = express.Router();
const Genres = require('../Genres/Genres');
const Country = require('../Country/country');
const User = require("../auth/User");
const Film = require('../Films/Film')

router.get('/', async(req, res) => {
    // console.log(req.query);
    //фильтрация по жанрам
    const options = {};
    const genres = await Genres.findOne({key: req.query.genre})
    console.log(genres);
    if(genres){
        options.genre = genres._id
        res.locals.genre = req.query.genre
    }
    // console.log(options);
    //страницы
    let page = 0;
    const limit = 3;
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    
    const totalFilms = await Film.count(options)
    // console.log(totalFilms);

    const allGenres = await Genres.find()
    const films = await Film.find(options).limit(limit).skip(page*limit).populate('country').populate('genre').populate('author')
    // console.log(films);
    const user = req.user ? await User.findById(req.user._id) : {}

    res.render('index', {genres: allGenres, user, films, pages: Math.ceil(totalFilms / limit)})
})
router.get('/login', (req, res) => {
    res.render('login', {user: req.user ? req.user : {}})
})
router.get('/register', (req, res) => {
    res.render('register', {user: req.user ? req.user : {}})
})
router.get('/profile/:id', async(req, res) => {
    const allGenres = await Genres.find()
    const user = await User.findById(req.params.id).populate('toWatch')
    .populate({path: 'toWatch', populate: {path: 'country'}})
    .populate({path: 'toWatch', populate: {path: 'genre'}})
    
    // console.log(user.id);
    // console.log(user);
    if(user){
        res.render('profile', {user: user, genres: allGenres, loginUser: req.user}) 
    }
})
router.get('/admin/:id', async(req, res) => {
    const allGenres = await Genres.find()
    const films = await Film.find().populate('country').populate('genre').populate('author')
    const user = await User.findById(req.params.id)
    res.render('adminProfile', {user: user, genres: allGenres, loginUser: req.user, films})
})
router.get('/new', async(req, res) => {
    const allGenres = await Genres.find()
    const allCountries = await Country.find()
    res.render('newFilm', {genres: allGenres, countries: allCountries, user: req.user ? req.user : {}})
})
router.get('/edit/:id', async(req, res) => {
    const allGenres = await Genres.find()
    const allCountries = await Country.find()
    const film = await Film.findById(req.params.id)
    res.render('editFilm', {genres: allGenres, countries: allCountries, user: req.user ? req.user : {}, film: film})
})
router.get('/not-found', (req, res)=>{
    res.render('notFound')
})
router.get('/detail/:id', async(req, res)=>{
    const film = await Film.findById(req.params.id).populate('country').populate('genre')
    res.render('detail', { user: req.user ? req.user : {}, film: film})
})

module.exports = router;
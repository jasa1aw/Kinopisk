const express = require('express');
const router = express.Router();
const {upload} = require('./multer')
const {createFilm, editFilm, deleteFilm, saveFilm, deleteFromWatch } = require('./controller')
const {isAuth, isAdmin} = require('../auth/middlewares')

router.post('/api/films/new', isAdmin, upload.single('image'), createFilm);
router.post('/api/films/edit', isAdmin, upload.single('image'), editFilm);
router.delete('/api/films/:id', isAdmin, deleteFilm);
router.post('/api/films/save', isAuth, saveFilm)
router.delete('/api/films/save/:id', isAuth, deleteFromWatch)

module.exports = router;
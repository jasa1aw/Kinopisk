const express =  require('express');

const app = express()

app.use(express.static('public'));
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/login', (req, res) => {
    res.render('login')
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})
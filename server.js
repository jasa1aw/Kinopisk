const express =  require('express');

const app = express()

require('./server/config/db')

app.use(express.static('public'));
app.set("view engine", "ejs")
app.use(require('./server/pages/router'))
app.use(require('./server/Genres/router'))
app.use(require('./server/Country/router'))


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})
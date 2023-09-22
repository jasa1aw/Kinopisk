const express =  require('express');

const app = express()
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render()
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server work on port ${PORT}`);
})
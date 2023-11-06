const Rate = require('./Rates');

const saveRate = async(req, res) =>{
    if(req.body.authorId && req.body.filmId && req.body.rate){
        await new Rate({
            rate: req.body.rate,
            text: req.body.text,
            authorId: req.body.authorId,
            filmId: req.body.filmId,
        }).save()
    }
    // console.log(req.body);
    res.status(200).send(true);
}

module.exports = {saveRate}
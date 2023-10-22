const isAuth = (req, res, next) => {
    // console.log(req.user);
    if(req.user){
        next()
    }else{
        res.status(401).send('Unauthorized')
    }
}

const isAdmin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(403).send('Acces forbiden')
    }
}

module.exports = {isAuth, isAdmin}
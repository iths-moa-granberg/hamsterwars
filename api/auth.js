module.exports = (req, res, next) => {    
    if (req.url === '/') {
        next();
    } else {
        const APIkey = process.env.SECRET;
        if (req.headers['authorization'] === APIkey) {
            next();
        } else {
            res.status(403).send('No API for you');
        }
    }
}
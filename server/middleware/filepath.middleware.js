function filePath(filePath, staticPath){
    return function (req, res, next){
        req.filePath = filePath;
        req.staticPath = staticPath;
        next();
    }
}

module.exports = filePath;
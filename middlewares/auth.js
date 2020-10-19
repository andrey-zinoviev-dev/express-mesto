const jwt = require('jsonwebtoken');
const authentificate = (req, res, next) => {
    const { authorization } = req.headers;
    
    if(!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Необходима авторизация'});
    }
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, 'secret-key');
    req.user = payload;
    next();
}

module.exports = {
    authentificate
}
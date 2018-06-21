const jwt = require('jsonwebtoken');

const extractToken = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const codedToken = authorization.substring(7);
    const token = jwt.verify(codedToken, process.env.SECRET);
    request.token = token;
  }
  next();
};

module.exports = extractToken;

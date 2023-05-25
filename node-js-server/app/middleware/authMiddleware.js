const jwt = require('jsonwebtoken');
const {secret} = require('../config');
module.exports = function(req, res, next) {
  if (req === 'OPTIONS') {
    next()
  }
  try {
const token = req.headers.authorization.split(' ')[1]
if(!token) {
    return req.status(403).json({message:'користувач не авторизований лол'})
}
const decodatedData =  jwt.verify(token, secret );
req.user = decodatedData;
next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({message: "Пользователь не авторизован"})
}
}
const jwt = require('jsonwebtoken');

function checkAuth(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1]; 
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken; 
        next();
    }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e
        });
    }
}

function hasRole(role) {
  return function(req, res, next) {
    try{
      const token = req.headers.authorization.split(" ")[1]; 
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      const foundRole = decodedToken.rules.find(e => e === role);
      return foundRole ? next() : res.status(403).send({ error: 'Access Denied' });
    
     
  }catch(e){
      return res.status(401).json({
          'message': "Invalid or expired token provided!",
          'error':e
      });
  }
  }
}

  function hasAllRoles(roles) {
    return function(req, res, next) {
      try{
        const token = req.headers.authorization.split(" ")[1]; 
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const foundAllRole = roles.every(e => {
        const foundRole =   decodedToken.rules.find(i => i === e);
        return foundRole ? true:false;
        });
        return foundAllRole ? next() : res.status(403).send({ error: 'Access Denied' });
    }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e
        });
    }
    }
  }

  function hasAnyRole(roles) {
    
    return function(req, res, next) {
      try{
        const token = req.headers.authorization.split(" ")[1]; 
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const foundAnyRole = roles.some(e => {
          console.log(e);
        const foundRole =   decodedToken.rules.find(i => i === e);
        return foundRole ? true:false;
        });
        return foundAnyRole ? next() : res.status(403).send({ error: 'Access Denied' });
    }catch(e){
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error':e
        });
    }
    }
  }
module.exports = {
    checkAuth: checkAuth,
    hasRole:hasRole,
    hasAnyRole:hasAnyRole,
    hasAllRoles:hasAllRoles,
}
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  
  if(req.ip == "::ffff:127.0.0.1"){
    res.json([
      { id: 1, username: "somebody"},
      { id: 2, username: "somebody_else2sdsds"}
    ]);
    console.log("true");
  }else{
    res.status(403).send('<h3>Unauthorized request.</h3>');       // HTTP status 404: NotFound for external users
  }
  
  
});
router.post('/', function(req, res, next) {
 
  if(req.ip == "::ffff:127.0.0.1"){
    
  }else{
    // HTTP status 404: NotFound for external users
    res.status(403).send('<h3>Unauthorized request.</h3>');       
  }
  
  
});

module.exports = router;

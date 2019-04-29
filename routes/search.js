var express = require('express');
var router = express.Router();
var mg = require('./mg');

router.get('/', function(req, res, next) {
  
  //读库
  mg({
    dbName:'project',
    collectionName:'user'
  },(collection,client)=>{
    collection.find({name : req.query.name}).toArray((err,data)=>{
      if(data.length>0){
        delete data[0].password;
        res.send(data);
      }else{
        res.send([]);
      }
    })
  })

});

module.exports = router;
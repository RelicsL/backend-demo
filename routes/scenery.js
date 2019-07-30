var express = require('express');
var router = express.Router();
var mg = require('./mg');

router.get('/', function(req, res, next) {
  
  //读库
  mg({
    dbName:'project',
    collectionName:'scenery'
  },(collection,client)=>{
    collection.find().toArray((err,data)=>{
      if(data.length>0){
        res.send(data)
      }else{
        res.send([])
      }
    })
  })

});

module.exports = router;

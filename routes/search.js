var express = require('express');
var router = express.Router();
var mg = require('./mg');

/* GET home page. */

// localjhost:3000/news?start=1&count=2

router.get('/', function(req, res, next) {
  

  // let start=req.query.start-0;
  // let count=req.query.count-0;

  //读库
  //读库
  mg({
    dbName:'project',
    collectionName:'user'
  },(collection,client)=>{
    collection.find({name : req.query.name}).toArray((err,data)=>{
      if(data.length>0){
        res.send(data);
      }else{
        res.send([]);
      }
    })
  })
  

});

module.exports = router;
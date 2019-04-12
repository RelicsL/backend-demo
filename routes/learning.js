var express = require('express');
var router = express.Router();
var mg = require('./mg');

/* GET home page. */

// localjhost:3000/news?start=1&count=2

router.get('/', function(req, res, next) {
  
  // console.log('news',req.query)

  // let start=req.query.start-0;
  // let count=req.query.count-0;

  //读库
  //读库
  mg({
    dbName:'project',
    collectionName:'learning'
  },(collection,client)=>{
    if(req.query.did !== undefined){
      collection.find({id : Number(req.query.did)}).toArray((err,data)=>{
        if(data.length>0){
          res.send(data)
        }else{
          res.send({error:1,msg:'数据为空'})
        }
      })
    }else{
      collection.find().toArray((err,data)=>{
        if(data.length>0){
          res.send(data)
        }else{
          res.send({error:1,msg:'数据为空'})
        }
      })
    }
  })
  

});

module.exports = router;
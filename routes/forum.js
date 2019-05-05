var express = require('express');
var router = express.Router();
var mg = require('./mg');
var objectId = require('mongodb').ObjectId;

router.get('/', function(req, res, next) {

  //读库
  mg({
    dbName:'project',
    collectionName:'forum'
  },(collection,client)=>{
    if (req.query.did !== undefined) {
      collection.find({_id : objectId(req.query.did)}).toArray((err,data)=>{
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
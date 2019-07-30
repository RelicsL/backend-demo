var express = require('express');
var router = express.Router();
var mg = require('./mg');
var objectId = require('mongodb').ObjectId;

router.get('/', function(req, res, next) {

  //读库
  mg({
    dbName:'project',
    collectionName:'learning'
  },(collection,client)=>{
      if (req.query.did !== undefined) {
        try {
          collection.find({ _id: objectId(req.query.did) }).toArray((err,data)=>{
            res.send(data);
          })
        } catch(err){
          res.status(400).send({ error: 1, msg: '传参错误' });
        }
    }else{
      collection.find().toArray((err,data)=>{
        if (data.length > 0) {
          res.send(data);
        }else{
          res.send([]);
        }
      })
    }
  })
  
});

module.exports = router;
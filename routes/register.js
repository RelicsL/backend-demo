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
      if(!data.length){
        collection.insert(req.query);
        res.send({ ...req.query });
      }else{
        res.send({ error: 1, msg: '用户名已存在' });
      }
    })
  })
  
});

module.exports = router;
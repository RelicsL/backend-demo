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
      if(data.length){
        if(data[0].password == req.query.password){
          delete data[0].password;
          res.send({success:{data : data[0]}})
        }else{
          res.send({error:{msg:'用户名或密码不正确！'}})
        }
      }else{
        res.send({error:{msg:'用户名不存在'}})
      }
    })
  })
  
});

module.exports = router;
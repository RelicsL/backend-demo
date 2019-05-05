var express = require('express');
var router = express.Router();
var mg = require('./mg');

router.get('/', function (req, res, next) {

  //读库
  mg({
    dbName: 'project',
    collectionName: 'forum'
  }, (collection, client) => {
    collection.find().toArray((err, data) => { 
      collection.insert({ ...req.query, comments: [] });
      res.send();
    })
  })

});

module.exports = router;
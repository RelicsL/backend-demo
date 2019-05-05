var express = require('express');
var router = express.Router();
var mg = require('./mg');
var objectId = require('mongodb').ObjectId;

router.get('/', function (req, res, next) {

  //读库
  mg({
    dbName: 'project',
    collectionName: 'forum'
  }, (collection, client) => {
      collection.find({ _id: objectId(req.query.did) }).toArray((err, data) => {
        if (data.length > 0) {
          if (req.query.index !== undefined) {
            data[0].comments.splice(req.query.index,1);
            collection.update({ _id: objectId(req.query.did) }, data[0]);
          } else {
            data[0].comments.push(req.query);
            collection.update({ _id: objectId(req.query.did) }, data[0]);
          }
          res.send();
        } else {
          res.send({ error: 1, msg: '数据为空' })
        }
      })
    })
});

module.exports = router;
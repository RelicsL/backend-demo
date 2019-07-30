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
      try {
        collection.find({ _id: objectId(req.query.did) }).toArray((err, data) => {
          if (req.query.index !== undefined) {
            data[0].comments.splice(req.query.index,1);
            collection.update({ _id: objectId(req.query.did) }, data[0]);
          } else {
            data[0].comments.push(req.query);
            collection.update({ _id: objectId(req.query.did) }, data[0]);
          }
          res.send({ _id: objectId(req.query.did) }, data[0]);
        })
      } catch (err) {
        res.send({ error: 1, msg: '传参错误' })
      }
    })
});

module.exports = router;


var mongo = require('mongodb');
var url = process.env.MONGOHQ_URL;


exports.save = function(req, res){
  var date = new Date();

  var email = req.params.email;

  mongo.Db.connect(url, function (err, db) {
    db.collection('email', function(er, collection) {
      collection.insert({$set:{'email': email, 'date': date}}, {safe: true}, function(er,rs) {
      });
    });
  });

  res.json({'email':email});
};




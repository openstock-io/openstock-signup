var mongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOHQ_URL;

exports.save = function(req, res){
  var date = new Date();
  var email = req.params.email;

  mongoClient.connect(url, function (err, db) {

    if (!err){
      db.collection('email').save({'_id': email, 'date': date}, function(er,rs) {
        if(!er){
          res.json({'status':'success'});
        }

        else{        
          res.json({'errors':[{'message': 'Database error', 'code':101}]});
        }

      });
    }
    else{
        res.json({'errors':[{'message': 'Database connection error', 'code':100}]});      
    }
  });
};

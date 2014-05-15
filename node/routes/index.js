var mongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOHQ_URL;

function Entity(){}
function StorageRepository(){}

StorageRepository.prototype.persist = function(entity, callback){

  if(!url){
    return callback({'error':true});
  }

  mongoClient.connect(url, function (err, db) {

    if (!err) {
      db.collection('email').save({'_id': entity.email, 'date': entity.date}, function(er,rs) {
          return callback(er);
      });
    } else{
        return callback(err);
    }
  });  
}




// API

exports.index = function(req, res){
  res.send('You probably want <a href="http://openstock.io">www.openstock.io</a>');
};

exports.save = function(req, res){
  var entity = new Entity();
  entity.date = new Date();
  entity.email = req.params.email;

  var repo = new StorageRepository();

  repo.persist(entity, function(err){
    if (!err) {
      res.json({'status':'success'});    
    } else{
      res.send(400);    
    }
  });


};

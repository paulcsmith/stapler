var should = require('should');
var fs = require('fs');
var collectionAttachment = require('../index.js');

describe('Collection Attachment', function(){
  describe('attach(file, collection, id, callback)', function(){
    it('should move original file to the correct default directory', function(done){
      var path = './test/tmp/pic.jpg';
      fs.createReadStream(path).pipe(fs.createWriteStream(path + '.bkp'));
      var name = 'pic.jpg.bkp';
      path = path + '.bkp';
      var file = {path: path, name: name};
      collectionAttachment.attach(file, {collection: 'products', id: '12345'}, function (err, file) {
        if (err) throw err;
        file.path.should.equal('./public/uploads/products/12345/' + name);
        file.name.should.equal(name);
        done();
      })
    })
  })
})

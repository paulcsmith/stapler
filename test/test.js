var should = require('should');
var fs = require('fs');
var collectionAttachment = require('../index.js');
var path = './test/tmp/pic.jpg';
var name = 'pic.jpg.bkp';
var file;

describe('Collection Attachment', function(){
  beforeEach(function copyTestFile () {
    fs.createReadStream(path).pipe(fs.createWriteStream(path + '.bkp'));
    path = path + '.bkp';
    file = {path: path, name: name};
  })

  describe('attach(file, collection, id, callback)', function(){
    it('should move original file to the correct default directory', function(done){
      collectionAttachment.attach(file, {collection: 'products', id: '12345'}, function (err, file) {
        if (err) throw err;
        file.path.should.equal('./public/uploads/products/12345/' + name);
        file.name.should.equal(name);
        done();
      })
    })
  })
})

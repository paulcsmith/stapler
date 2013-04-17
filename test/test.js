var should = require('should');
var fs = require('fs.extra');
var collectionAttachment = require('../index.js');
var original_file_path = './test/tmp/pic.jpg';
var name = 'pic.jpg.bkp';
var config = {collection: 'products', id: '12345'};
var path;
var file;

describe('Collection Attachment', function(){
  beforeEach(function copyTestFile () {
    fs.createReadStream(original_file_path).pipe(fs.createWriteStream(original_file_path + '.bkp'));
    path = original_file_path + '.bkp';
    file = {path: path, name: name};
  })

  afterEach(function removeAttachedFile () {
    fs.rmrfSync(process.cwd() + '/public');
  })

  describe('attach(file, collection, id, callback)', function(){
    it('should return the correct name and the new file path', function(done){
      collectionAttachment.attach(file, config, function (err, new_file) {
        if (err) throw err;
        new_file.path.should.equal('./public/uploads/products/12345/' + name);
        new_file.name.should.equal(name);
        done();
      })
    })

    it('should save the file to the default directory', function (done) {
      collectionAttachment.attach(file, config, function (err, new_file) {
        if (err) throw err;
        fs.existsSync(new_file.path).should.equal(true);
        done();
      })
    })
  })

})

// Pass in the file object. File object should have a property for path and name
// Options:
//   collection: a String with the collection name
//   id: a String that is the id of the object you are attaching a file to
//   base_filepath: a String that will act as the base file path e.g. ~/my_express_project/public/uploads
// standard callback function (err, new_path)

// On Success it will return an object with the path and file name
exports.attach = function (file, opts, callback) {
  var base_filepath = opts.base_filepath || './public/uploads/';
  var collection = opts.collection;
  var id = opts.id;
  var tmp_path = file.path; // get the temporary location of the file
  var target_base_path = base_filepath + collection + '/' + id + '/';
  var target_path = target_base_path + file.name;
  makeDirectroyIfDoesNotExist(target_base_path, function (err) {
    if (err) {
      callback(err, null);
    } else {
      moveFileToNewLocation(tmp_path, target_path, function returnPathAndName (err, new_path) {
        callback(err, {path: new_path, name: file.name});
      });
    }
  })
}

function makeDirectroyIfDoesNotExist (target_base_path, callback) {
  var mkdirp = require('mkdirp');
  mkdirp(target_base_path, function (err) {
    if (err) return callback(err, null);
    callback(null);
  });
}

function moveFileToNewLocation (tmp_path, target_path, callback) {
  var fs = require('fs');
  fs.rename(tmp_path, target_path, function(err) {
    if (err) callback(err, null);
    callback(null, target_path);
  });
}

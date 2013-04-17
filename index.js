// Pass in the file object. File object should have a property for path and name
// Pass in a string with the collection name
// Pass in a string that is the id of the object you are attaching a file to
// standard callback function (err, new_path)
module.exports = function uploadFile (file, collection, id, callback) {
  var fs = require('fs');
  var mkdirp = require('mkdirp');
  // get the temporary location of the file
  var tmp_path = file.path;
  var target_base = './public/uploads/' + collection + '/' + id + '/';
  var target_path =  target_base + file.name;
  // Make the file
  mkdirp(target_base, function (err) {
    if (err) callback(err, null);
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
      if (err) callback(err, null);
      console.info("Successfully saved file to:", target_path);
      callback(null, target_path);
    });
  });
}

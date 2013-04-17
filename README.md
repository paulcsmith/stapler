## What it does

Easy way to attach documents to objects

## Why?

Because there is no easy to save attached files in a hierarchical way that is simple to use.

## How to use it

```javascript
var collectionAttachment = require('../index.js'); // Require the module
var story = Story.findById('123'); // Get the record you want to attach the file to
var file = { path: 'tmp/1298hasdk3hfskjhsdf.file', name: 'sunset.jpg' }; // Normally will be from req.files
var config = { collection: 'story', id: story.id } // Collection and id are required
// Will move the file from the tmp location and into './public/uploads/#{collection_name}/#{id}/#{filename}'
collectionAttachment.attach(file, config, function (err, new_file) {
  new_file.name; // 'sunset.jpg'
  new_file.path; // './public/uploads/story/123/sunset.jpg';
  story.photo = new_file.path;
})
```

Then in your views you can access it like this

```html
<img src="/uploads/story/123/sunset.jpg">
```

## Gotchas

Collection attachment does not do ANYTHING to the model. You must handle that yourself. All that you should need to do is save the filename to your object in Mongo, MySQL or whatever datastore. Then in your view you can easily construct the file path as shown above.

## Testing

In the command line run `mocha test`

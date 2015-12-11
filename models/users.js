var assert = require('assert')
var db = require('../db')

exports.insert = function(user, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Insert a user
  collection.insert(user, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    console.log('Inserted 1 document into the users collection')
    callback(result)
  })
}

exports.find = function(id, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Find a user
  collection.findOne({'_id': id}, function(err, document) {
    assert.equal(err, null)
    console.log('Found 1 user document')
    callback(document)
  })
}

exports.update = function(user, callback) {
  //get users collection
  var collection = db.get().collection('users')
  //user._id = ObjectId(user._id)
  //update the user
  collection.update({'_id': user._id},
    {$set: user},
    function(err, result){
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      console.log('updated 1 document in the users collection')
      callback()
    }
  )
}

exports.addTag = function(id, tag, callback) {
  //get users collection
  var collection = db.get().collection('users')
  //user._id = ObjectId(user._id)
  //update the user
  collection.update({'_id': id},
    {$push: {tags: tag} },
    function(err, result){
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      console.log('updated 1 document in the users collection')
      callback()
    }
  )
}

exports.removeTag = function(id, tag, callback) {
  //get users collection
  var collection = db.get().collection('users')
  //user._id = ObjectId(user._id)
  //update the user
  collection.update({'_id': id},
    {$pull: {tags: tag} },
    function(err, result){
      assert.equal(err, null)
      assert.equal(1, result.result.n)
      console.log('updated 1 document in the users collection')
      callback()
    }
  )
}

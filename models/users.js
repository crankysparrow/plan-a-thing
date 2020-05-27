var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var moment = require( 'moment' );

var UserSchema = new Schema({
  name: {type: String},
  event: {type: Schema.Types.ObjectId, ref: 'Event'},
  available: [{type: Date}]
})

module.exports = mongoose.model( 'User', UserSchema );
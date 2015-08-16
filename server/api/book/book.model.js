'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
	owner: { type:Schema.ObjectId, ref:"User"},
	image: String,
	isbn: String,
  	name: String,
  	tradeable: Boolean
/*  	tradeInfo: { 
  		ReqUserID: { type:Schema.ObjectId, ref:"User"},
	  	tradeWithBookID: { type:Schema.ObjectId, ref:"Book"},
	  	tradeStatus: Number 
	  }
*/
});

module.exports = mongoose.model('Book', BookSchema);

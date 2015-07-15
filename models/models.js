var mongoose=require('mongoose');

var Schema= mongoose.Schema;

var member=new Schema({
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:false
	}

});

module.exports={
	Member: mongoose.model('member',member)
};
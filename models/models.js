var mongoose=require('mongoose');

var Schema= mongoose.Schema;

var user=new Schema({
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

models.exports={
	User: mongoose.model('user',user);
}
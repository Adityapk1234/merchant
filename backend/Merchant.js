const mongoose = require('mongoose')

const MerchantSchema = new mongoose.Schema({
	productName: {
		type : String,
		required : true
	},
	productDescription : {
		type : String
	},
	seoName : {
		type : String
	},
	seoDescription : {
		type : String
	}
})

const Merchant = mongoose.model("Merchant", MerchantSchema)
module.exports = Merchant
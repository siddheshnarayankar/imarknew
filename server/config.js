'use strict';

var config = {
	'secretKey': process.env.SecretKey || '12345-67890-98765-43210',
	'mongoURL': process.env.A4MC_MongoURL || 'mongodb://localhost:27017/siteDB',
	//'mongoURL': process.env.A4MC_MongoURL || 'mongodb://admin:X1REo3k8HmvGnXsk@SG-dbsite-25011.servers.mongodirector.com:27017/admin?ssl=true',
	'google': {
		clientID: process.env.A4MC_GoogleClient || 'YOUR_GOOGLE_CLIENT_ID',
		clientSecret: process.env.A4MC_GoogleSecret || 'YOUR_GOOGLE_SECRET_KEY',
		callbackURL: process.env.A4MC_GoogleCallback || 'YOUR_GOOGLE_API_CALLBACK_URL'
	},
};
exports = module.exports = function(app) {
	app.config = config;
};

exports.config = config;
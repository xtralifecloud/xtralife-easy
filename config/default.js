/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let configuration;
const os = require('os');
const util = require('util');
const xlenv = require("xtralife-env");
const env = process.env.NODE_ENV || 'dev';

const Promise = require('bluebird');
Promise.promisifyAll(require('redis'));

module.exports = (configuration = {
	nbworkers : 0, // 0 means one worker per CPU

	logs: {
		logfile: {
			enable: true,
			filename : 'xtralife'
		},

		slack: {
			enable: false
		},

		elastic: {
			enable: false
		},

		logconsole: {
			enable: true,
			level: 'debug'
		}
	},

	redis: {
		port : null,
		host : null
	},

	redisClient(cb){
		const client = require('redis').createClient(xlenv.redis.port, xlenv.redis.host);
		return client.info(err => cb(err, client));
	},

	redisChannel(cb){
		const client = require('redis').createClient(xlenv.redis.port, xlenv.redis.host);
		return client.info(err => cb(err, client));
	},

	redisStats(cb){
		const client = require('redis').createClient(xlenv.redis.port, xlenv.redis.host);
		return client.info(function(err){
			client.select(10);
			return cb(err, client);
		});
	},

	mongodb: {
		dbname: 'xtralife',

		options: { // see http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
			w: 1,
			readPreference: "primaryPreferred",
			promiseLibrary: require('bluebird'),
			useUnifiedTopology: true
		}
	},


	mongoCx(cb){
		return require("mongodb").MongoClient.connect(xlenv.mongodb.url, xlenv.mongodb.options, (err, mongodb) => cb(err, mongodb));
	},

	options: {
		disableIndexModule: false,
		notifyUserOnBrokerTimeout: true,
		removeUser: true, // should we allow removing a user ?

		hookLog: {
			enable: true,
			showInOurLogs: true,
			limit: 100
		},

		timers: {
			enable: true,
			listen: true
		},

		// this is the max number of recepients for an event
		// it must be limited because of read/write amplification
		maxReceptientsForEvent: 10,

		hostnameBlacklist: ['localhost', '127.0.0.1']
	},

	metrics: {
		duration : 300
	},

	http: {
		bodySizeLimit: '500kb',
		cors: {
			origin: true, // TODO replace with a function to check against game allowed origins
			credentials: true,
			methods: ['GET', 'PUT', 'POST', 'DELETE']
		}, // DELETE ?

		port : 2000,
		timeout: 600000
	},

	monitor: {
		interval: 15000
	},

	xtralife: {
		games: {}
	},

	AWS: {
		S3: {
			bucket: null,
			credentials: {
				region: null,
				accessKeyId: null,
				secretAccessKey: null
			}
		}
	},

	hooks: {
		definitions: {},
		functions: { // CONFIGURE YOUR BATCHES / HOOKS for each domain
			"youdomain.com": require('./batches/yourdomain.js')
		}
	},

	elastic(cb){
		const elastic = require("elasticsearch");
		const client = new elastic.Client(); // defaults to localhost
		client.sniff();
		return cb(null, client);
	}
});

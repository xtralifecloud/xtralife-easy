let configuration;
const Redis = require('ioredis');

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
		config: {
			host: null,
			port: null
		}
	},

	redisClient(cb){
		const redis = new Redis(xlenv.redis.config);
		redis.info((err) => {
			return cb(err, redis);
		})
	},

	redisChannel(cb){
		const redis = new Redis(xlenv.redis.config);
		redis.info((err) => {
			return cb(err, redis);
		})
	},

	redisStats(cb){
		const redis = new Redis(xlenv.redis.config);
		redis.info((err) => {
			return cb(err, redis);
		})
	},

	mongodb: {
		dbname: 'xtralife',

		options: { // see http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
			w: 1,
			readPreference: "primaryPreferred",
			useUnifiedTopology: true
		}
	},

	mongoCx(cb) {
		const { MongoClient } = require('mongodb');
		const client = new MongoClient(xlenv.mongodb.url, xlenv.mongodb.options);
		return client.connect()
			.then(() => cb(null, client))
			.catch(err => cb(err));
	},

	elastic: {
		driver: {
			version: "8.7.0",
		}
	},

	elasticClient(cb){
		const { Client } = require('@elastic/elasticsearch')
		const client = new Client({
			node: 'http://localhost:9200',
		})
		return cb(null, client);
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

		redlock: {
			timeout: 200,
			overrideTimeoutViaParams: false
		},
		
		// this is the max number of recepients for an event
		// it must be limited because of read/write amplification
		maxReceptientsForEvent: 10,

		hostnameBlacklist: ['localhost', '127.0.0.1'],

		gameCenterTokenMaxAge: 60 * 60 * 24 * 7, // 1 week (seconds)
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

	AWS: { // CONFIGURE ACCESS TO YOUR AWS S3 BUCKET
		S3: {
			bucket: null,
			region: null,
			credentials: {
				accessKeyId: null,
				secretAccessKey: null
			}
		}
	},

	hooks: {
		functions: { // CONFIGURE YOUR BATCHES / HOOKS for each domain
			"youdomain.com": require('./batches/yourdomain.js')
		}
	},
});

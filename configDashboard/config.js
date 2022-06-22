const Q = require('bluebird');
Q.promisifyAll(require('redis'));

module.exports = {
	context: "dashboard",

	redis: {
		port : 6379,
		host : 'localhost'
	},

	redisClientSync(){
		return require('redis').createClient(xlenv.redis.port, xlenv.redis.host);
	},

	redisClient(cb){
		const client = require('redis').createClient(xlenv.redis.port, xlenv.redis.host);
		return client.info(err => cb(err, client));
	},

	mongodb: {
		dbname: 'xtralife',
		options: { // see http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
			w: 1,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			promiseLibrary: require('bluebird'),
			readPreference: "primaryPreferred",
		}
	},

	mongoCx(cb){
		return require("mongodb").MongoClient.connect(xlenv.mongodb.url, xlenv.mongodb.options, cb);
	},

	http: {
		bodySizeLimit: '1000kb',
		cors: {
			origin: true, // TODO replace with a function to check against game allowed origins
			credentials: true,
			methods: ['GET', 'PUT', 'POST']
		}, // DELETE ?

		limiter: {
			lookup: 'user.name', // TODO specify function instead
			total: 50,
			expire: 60*1000,
			ignoreErrors: true
		}
	}, // TODO specify custom overusage function


	options: {
		notifyUserOnBrokerTimeout: true,
		removeUser: true,
		removeLeaderboard : true,
		title: 'Xtralife Dashboard',
		themeColor: "",	// Hexadecimal values, examples : #131f8f #194320 #570530 #191919 #2D2424
	},

	logs: {
		level: 'debug',			
		logconsole: {
			enable: true,
			level: 'debug'
		}
	},

	xtralife: {
		games: {}
	},

	dashboard: {
		users: {},
		session: {
			name : 'dashboard.xtralife',
			secret : 'configure key'
		},
	},

	AWS: {
		S3: {
			bucket: "",
			region: "",
			credentials: {
				accessKeyId: "",
				secretAccessKey: ""
			}
		}
	},
};

Q = require 'bluebird'
Q.promisifyAll(require('redis'))


module.exports =

	redis:
		port : 6379
		host : 'localhost'

	redisClientSync: ()->
		require('redis').createClient(xlenv.redis.port, xlenv.redis.host)

	redisClient: (cb)->
		client = require('redis').createClient(xlenv.redis.port, xlenv.redis.host)
		client.info (err)->
			cb err, client

	redisChannel: (cb)->
		client = require('redis').createClient(xlenv.redis.port, xlenv.redis.host)
		client.info (err)->
			cb err, client

	redisStats: (cb)->
		client = require('redis').createClient(xlenv.redis.port, xlenv.redis.host)
		client.info (err)->
			client.select 10
			cb err, client

	mongodb:
		dbname: 'xtralife'
		options: # see http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
			db:
				w: 1
				readPreference: "primaryPreferred"

			server:
				auto_reconnect: true

			promiseLibrary: require 'bluebird'

	mongoCx: (cb)->
		require("mongodb").MongoClient.connect xlenv.mongodb.url, xlenv.mongodb.options, cb

	http:
		cors:
			origin: true # TODO replace with a function to check against game allowed origins
			credentials: true
			methods: ['GET', 'PUT', 'POST'] # DELETE ?

		limiter:
			lookup: 'user.name' # TODO specify function instead
			total: 50
			expire: 60*1000
			ignoreErrors: true # TODO specify custom overusage function


	options:
		notifyUserOnBrokerTimeout: false
		# should we allow removing a user ?
		removeUser: true
		removeLeaderboard : true
		showHookLog : true

	elastic: (cb)->
		elastic = require("elasticsearch")
		client = new elastic.Client()
		cb null, client

	logs:
		level: 'debug'			
		logconsole:
			enable: true
			level: 'debug'

	xtralife:
		games: {}

	dashboard:
		users: {}
		session:
			name : 'dashboard.xtralife'
			secret : 'configure key'

	AWS:
		S3:
			bucket: "CHANGE ME"
			credentials:
				region: "CHANGE ME"
				accessKeyId: "CHANGE ME"
				secretAccessKey: "CHANGE ME"

	hooks:
		notifyOnSlack : false
		hookNames: [
			"common"
			"before-gamervfs-write"
			"after-gamervfs-write"
			"before-gamervfs-delete"
			"after-gamervfs-delete"
			"before-balance"
			"after-balance"
			"before-transaction"
			"after-transaction"
			"before-properties-write"
			"after-properties-write"
			"before-properties-delete"
			"after-properties-delete"
			"social-addprofile"
			"setGodfather-override-reward"
			'after-achievement-triggered'
			'after-achievement-userdata-modified'
			'before-match-create'
			'after-match-create'
			'before-match-delete'
			'after-match-delete'
			'after-match-dismissinvitation'
			'before-match-drawfromshoe'
			'after-match-drawfromshoe'
			'before-match-finish'
			'after-match-finish'
			'before-match-invite'
			'after-match-invite'
			'before-match-join'
			'after-match-join'
			'before-match-leave'
			'after-match-leave'
			'before-match-join'
			'before-match-postmove'
			'after-match-postmove'
		]
		recursionLimit: 5
		definitions: {}
		functions: {}

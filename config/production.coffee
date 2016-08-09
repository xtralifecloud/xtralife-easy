os = require 'os'
nodemailer = require "nodemailer"
sendgrid = require "nodemailer-sendgrid-transport"

module.exports =

	nbworkers: 1 # start only one worker, regardless of cpu count
	logs:
		level: 'debug'

	redis:
		host: "redis"
		port: 6379

	mongodb:
		url: "mongodb://mongodb:27017/?maxPoolSize=25"

	elastic: (cb)->
		elastic = require("elasticsearch")
		client = new elastic.Client
			host: "http://elastic:9200"
		cb null, client

	mailer: nodemailer.createTransport(sendgrid(
		auth: # CONFIGURE ACCESS TO SENDGRID
			api_user: "CONFIGURE"
			api_key: "CONFIGURE"
	))

	privateKey: "CONFIGURE : This is a private key and you should customize it"

	AWS: # CONFIGURE ACCESS TO YOUR AWS S3 BUCKET
		S3:
			bucket: null
			credentials:
				region: null
				accessKeyId: null
				secretAccessKey: null
				
	xtralife:
		games:
			"com.clanofthecloud.testgame": 
				apikey:"testgame-key"
				apisecret:"testgame-secret"
				config:
					enable:true
					domains:[]
					eventedDomains:[]
					certs:
						android:
							enable: false
							senderID: '' # CONFIGURE
							apikey: '' # CONFIGURE
						ios:
							enable: false
							cert: '' # CONFIGURE
							key: '' # CONFIGURE
						macos:
							enable: false
							cert: '' #CONFIGURE
							key: '' #CONFIGURE
					socialSettings:
						facebookAppToken : '' # CONFIGURE

			"com.clanofthecloud.cloudbuilder": 
				apikey:"cloudbuilder-key"
				apisecret:"azerty"
				config:
					enable:true
					domains:["com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3","com.clanofthecloud.cloudbuilder.test"]
					eventedDomains:["com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3"]
					certs:
						certs:
							android:
								enable: false
								senderID: '' # CONFIGURE
								apikey: '' # CONFIGURE
							ios:
								enable: false
								cert: '' # CONFIGURE
								key: '' # CONFIGURE
							macos:
								enable: false
								cert: '' # CONFIGURE
								key: '' # CONFIGURE

					socialSettings:
						facebookAppToken : '' # CONFIGURE


	hooks:
		definitions: null

		functions: # CONFIGURE YOUR BATCHES / HOOKS for each domain
			"com.yourdomain.domainName": require './batches/yourdomain.js'
			"com.clanofthecloud.cloudbuilder.azerty": require('./batches/integrationTests.js')["com.clanofthecloud.cloudbuilder.azerty"]
			"com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3": require('./batches/integrationTests.js')["com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3"]

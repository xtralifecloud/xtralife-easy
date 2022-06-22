const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");

module.exports = {

	nbworkers: 1, // start only one worker, regardless of cpu count
	logs: {
		level: 'debug'
	},

	redis: {
		host: "localhost",
		port: 6378
	},

	mongodb: {
		url: "mongodb://localhost:27018/?maxPoolSize=5"
	},

	elastic(cb){
		const elastic = require("elasticsearch");
		const client = new elastic.Client();
		return cb(null, client);
	},

	mailer: nodemailer.createTransport(sendgrid({
		auth: { // CONFIGURE ACCESS TO SENDGRID
			api_user: "CONFIGURE",
			api_key: "CONFIGURE"
		}
	})),

	privateKey: "CONFIGURE : This is a private key and you should customize it",

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

	xtralife: {
		games: {
			"com.clanofthecloud.testgame": { 
				apikey:"testgame-key",
				apisecret:"testgame-secret",
				config: {
					enable:true,
					domains:[],
					eventedDomains:[],

					facebook: {
						useBusinessManager : false
					},

					google: { // see google cloud platform
						clientID: '', // login
						inApp: { // in-app purchase android
							packageID: '',
							serviceAccount: {
								private_key_id: '',
								client_email: '',
								client_id: '',
								type: 'service_account'
							}
						}
					},

					apple: { // see apple developer console
						bundleID: '', // for login & apn
						gameCenterBundleIdRE: null, // login
						inApp: { // In-app
						},
						apn: { //apple push notification
							token: { // apn auth key
								key: "",
								keyId: "",
								teamId: "",
							},
							production: false,
						}
					},

					firebase: { // login & push Android (firebaseAdmin sdk), see firebase console
						type: "",
						project_id: "",
						private_key_id: "",
						private_key: "",
						client_email: "",
						client_id: "",
						auth_uri: "",
						token_uri: "",
						auth_provider_x509_cert_url: "",
						client_x509_cert_url: ""
					},

					steam: { // login
						appId: null,
						webApiKey: ''
					},
				}
			}, // CONFIGURE

			"com.clanofthecloud.cloudbuilder": { 
				apikey:"cloudbuilder-key",
				apisecret:"azerty",
				config: {
					enable: true,
					domains:["com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3","com.clanofthecloud.cloudbuilder.test"],
					eventedDomains:["com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3"],

					facebook: {
						useBusinessManager : false
					},

					google: { // see google cloud platform
						clientID: '', // login
						inApp: { // in-app purchase android
							packageID: '',
							serviceAccount: {
								private_key_id: '',
								client_email: '',
								client_id: '',
								type: 'service_account'
							}
						}
					},

					apple: { // see apple developer console
						bundleID: '', // for login & apn
						gameCenterBundleIdRE: null, // login
						inApp: { // In-app
						},
						apn: { //apple push notification
							token: { // apn auth key
								key: "",
								keyId: "",
								teamId: "",
							},
							production: false,
            }
					},

					firebase: { // login & push Android (firebaseAdmin sdk), see firebase console
						type: "",
						project_id: "",
						private_key_id: "",
						private_key: "",
						client_email: "",
						client_id: "",
						auth_uri: "",
						token_uri: "",
						auth_provider_x509_cert_url: "",
						client_x509_cert_url: ""
					},
					
					steam: { // login
						appId: null,
						webApiKey: ''
					},
				}
			}
		}
	}, // CONFIGURE


	hooks: {
		functions: { // CONFIGURE YOUR BATCHES / HOOKS for each domain
			"com.yourdomain.domainName": require('./batches/yourdomain.js'),
			"com.clanofthecloud.cloudbuilder.azerty": require('./batches/integrationTests.js')["com.clanofthecloud.cloudbuilder.azerty"],
			"com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3": require('./batches/integrationTests.js')["com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3"]
		}
	}
};

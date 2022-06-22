module.exports = {

	redis: {
		host: "localhost", 	// tunnel ssh forwarded to db1
		port: 6378
	}, 			// tunnel ssh port

	mongodb: {
		url: "mongodb://localhost:27018/?maxPoolSize=5"
	},

	logs: {
		level: 'debug'
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

					apple: { // see apple developer console
						bundleID: '', // for apn
						apn: { //apple push notification
							token: { // apn auth key
								key: "",
								keyId: "",
								teamId: "",
							},
							production: false,
						}
					},

					firebase: { // push Android (firebaseAdmin sdk), see firebase console
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
				},
			},

			"com.clanofthecloud.cloudbuilder": { 
				apikey:"cloudbuilder-key",
				apisecret:"azerty",
				config: {
					enable:true,
					domains:["com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3","com.clanofthecloud.cloudbuilder.test"],
					eventedDomains:["com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3"],

					apple: { // see apple developer console
						bundleID: '', // for apn
						apn: { //apple push notification
							token: { // apn auth key
								key: "",
								keyId: "",
								teamId: "",
							},
							production: false,
						}
					},

					firebase: { // push Android (firebaseAdmin sdk), see firebase console
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
				}
			}
		}
	},
						
	dashboard: {
		users: {
			"user": {
				email:"user",
				password:"5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
				games:["com.clanofthecloud.cloudbuilder","com.clanofthecloud.testgame"]
			}
		}
	},

	options: {
		title: "",
		themeColor: "", // Hexadecimal values, examples : #131f8f #194320 #570530 #191919 #2D2424
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


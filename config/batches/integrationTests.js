module.exports = {
	"com.clanofthecloud.cloudbuilder.azerty": {

		'after-properties-write': function () {
			return 'after';
		},
		'__test1': function () {
			return {input: params.request.input, domain: this.game.getPrivateDomain()};
		},
		'__test2': function () {
			return {userFound: params.user_id};
		},
		'__test3': function () {
			var domain = this.game.getPrivateDomain();

			return mod.Q.all(
				[this.virtualfs.read(domain, params.user_id, null),
					this.tx.balance(domain, params.user_id)]
			).spread(function (fs, balance) {
				return {fs: fs, balance: balance};
			});
		},
		'__test4': function () {
			return this.virtualfs.readmulti(params.domain, [params.user_id], ['test1', 'test2'], ['properties', 'balance', 'lb']
			).then(function (output) {
				return {params: params, output: output};
			});
		},
		'__login': function () {
			var contest = params.request.contest;
			return this.virtualfs.readmulti('com.clanofthecloud.cloudbuilder.azerty', [params.user_id], [], ['relations.godfather', 'properties.echo', 'balance.' + contest]);
		},
		'__describeUsers': function () {
			return this.virtualfs.readmulti('com.clanofthecloud.cloudbuilder.azerty', params.request.userids, ['key1', 'key2'], ['properties', 'balance.' + params.request.contest]);
		},
		'__myscore': function () {
			return this.leaderboard.score(this.game.getPrivateDomain(), params.user_id, 'batchboard', 'hightolow', params.request.value, params.request.info, false)
		}
	},

	"com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3": {
		'before-gamervfs-write': function () {
			return 'before';
		},
		'after-gamervfs-write': function () {
			if (userData != 'before') {
				throw new Error('Hook context lost');
			}
			return this.virtualfs.read('com.clanofthecloud.cloudbuilder.m3Nsd85GNQd3', params.user_id, null)
				.then(function (allkeys) {
					return 'DONE!';
				});
		}
	}
};

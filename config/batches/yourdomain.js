
// DO NOT IMPORT MODULES IF YOU WANT YOUR BATCHES TO BE COMPATIBLE WITH XTRALIFE.CLOUD

module.exports = {

	// The common hook is used to share functions in your own hooks and batches
	common: function(mod) {
		return {
			aCommonFunction: function (any, params, here) {
				mod.debug("I'm using mod from a function");
				return "nothing, really"
			},
			anotherCommonFunction: function (again, any, params) {
				return again + any + params;
			}
		}
	},

	// add any hook, they'll be called each time the relevant api is called
	// use quotes around the name of the hook
	"before-transaction": function (params, customData, mod) {
		return null; // or a promise
	},

	// add any number of batches, with two leading underscores __ in from of the name
	__myOwnBatch: function (params, customData, mod) {
		// batches myst ALWAYS return a promise
		return new mod.Q(function (resolve, reject) {
			resolve({yes: "it's working"});
		});
	}
};
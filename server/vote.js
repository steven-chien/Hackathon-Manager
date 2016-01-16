Meteor.methods({
	'vote': function(playerId, groupId) {
		console.log(playerId+' '+groupId);
		var player = Players.findOne(playerId);
		if(player.vote==null) {
			Players.update(playerId, { $set: { vote: true } });
			var vote = Vote.findOne({ voter: playerId });
			if(typeof vote != 'undefined') {
				throw Meteor.Error(500, 'Vote already casted!');
			}
			Vote.insert({ voter: playerId, vote: groupId });
			return true;
		}
		else {
			throw Meteor.Error(500, 'Vote already casted!');
		}
	},
	'voted': function(playerId) {
		var player = Players.findOne(playerId);
		console.log(player);
		if(player.vote==null) {
			return false;
		}
		return true;
	}
})

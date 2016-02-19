Meteor.methods({
        // Handle voting
        // If player id is not valid, throw an error
	'vote': function(playerId, groupId) {
		console.log('Vote:'+playerId+' '+groupId);
		var player = Players.findOne(playerId);

		// Ensure the id is valid
		if(player && player.group!=groupId) {
			Vote.insert({ voter: playerId, vote: groupId, time: new Date() });
		}
		else {
			throw new Meteor.Error(400, "Player ID is not valid.");
		}

		// Add vote in Vote
		return true;
	},
        // Return the name of the group which the player has voted
        // If not voted before, return undefined
        // If player id is not valid, throw an error
	'voted': function(playerId) {
		var player = Players.findOne(playerId);
                if(player==null) {
			throw new Meteor.Error(400,'ID not registered!');
                }

		var profile = { id: player._id, sid: player.sid, name: player.name, groupId: player.group };
                var voted = Vote.findOne({ voter:playerId }, { sort: { $natural: -1 }, limit:1 });

                if(typeof voted=='undefined') {
			return { voted: undefined, profile: profile };
		}
		else {
			var castedVote = Groups.findOne(voted.vote);
			if(castedVote)
				return { voted: castedVote.name, profile: profile };
		}
	}
});

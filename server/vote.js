Meteor.methods({
        // Handle voting
        // If player id is not valid, throw an error
	'vote': function(playerId, groupId) {
		console.log('Vote:'+playerId+' '+groupId);
		var player = Players.findOne(playerId);

		// Ensure the id is valid
		if(player) {
			Vote.insert({ voter: playerId, vote: groupId });
		}
		else {
			throw new Meteor.Error("Invalid playerID", "Player ID is not valid.");
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
                var voted = Vote.findOne({voter:playerId},{sort:{$natural:-1},limit:1});
                if(typeof voted=='undefined') {
			return { voted: undefined, profile: { sid: player.sid, name: player.name } };
		}
		else {
			var castedVote = Groups.findOne(voted.vote);
			if(castedVote)
				return { voted: castedVote.name, profile: { sid: player.sid, name: player.name, groupId: player.group } };
		}
	}
});

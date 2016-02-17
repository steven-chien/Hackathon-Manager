Meteor.methods({
        // Handle voting
        // If player id is not valid, throw an error
	'vote': function(playerId, groupId) {
		console.log('Vote:'+playerId+' '+groupId);
		var player = Players.findOne(playerId);

                // Ensure the id is valid
                if(player==null) {
                    throw new Meteor.Error("Invalid playerID", 
                      "Player ID is not valid.");
                }

                // Add vote in Vote
                Vote.insert({ voter: playerId, vote: groupId });

                return true;
	},
        // Return the name of the group which the player has voted
        // If not voted before, return undefined
        // If player id is not valid, throw an error
	'voted': function(playerId) {
		var player = Players.findOne(playerId);
                if(player==null) {
                    throw new Meteor.Error("Invalid playerID", 
                      "Player ID is not valid.");
                }
                var voted = Vote.findOne({voter:playerId},{sort:{$natural:-1},limit:1});
                if(typeof voted=='undefined')
                    return undefined;
                var voted_groupname = Groups.findOne({_id:voted.vote});
                if(typeof voted_groupname=='undefined')
                    return undefined;
		return voted_groupname.name;
	}
})

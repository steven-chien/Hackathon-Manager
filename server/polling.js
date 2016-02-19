Meteor.methods({
	countVotes: function() {
		var userId = Meteor.userId();
		if(userId) {
			var voteResult = [];
			var groups = Groups.find();
			var players = Players.find();
			groups.forEach(function(group) {
				var voteCounter = 0;
				players.forEach(function(voter) {
					var vote = Vote.findOne({voter:voter._id},{sort:{$natural:-1},limit:1});
					if(vote && vote.vote==group._id)
						voteCounter++;
				});
				voteResult.push({ name: group.name, count: voteCounter });
				console.log('Group: '+group.name+'; count: '+voteCounter);
			});
			console.log(voteResult);
			return voteResult;
		}
	}
});

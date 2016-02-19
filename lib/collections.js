Accounts.config({
	forbidClientAccountCreation : true
});

States = new Mongo.Collection('sys_states');
Players = new Mongo.Collection('players');
Groups = new Mongo.Collection('groups');
Vote = new Mongo.Collection('vote');
VoteCount = new Mongo.Collection('vote_count');

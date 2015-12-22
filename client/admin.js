/**
 * Created by anson on 12/22/2015.
 */
Template.AdminPage.helpers({
    username: function() {
        return Meteor.user().emails[0].address;
    }
});
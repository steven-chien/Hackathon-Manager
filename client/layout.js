/**
 * Created by anson on 12/21/2015.
 */
Template.ApplicationLayout.events({
    'click #navbar-custom-btn-base': function() {
        var state = Session.get('navToggle');
        if(state) {
            Session.set('navToggle', false);
        } else {
            Session.set('navToggle', true);
        }
    }
});

Template.ApplicationLayout.helpers({
    navToggle: function() {
        var state = Session.get('navToggle');
        if(state) {
            return 'toggle';
        } else {
            return ' ';
        }
    }
});

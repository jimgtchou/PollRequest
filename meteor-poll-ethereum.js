if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });

  Template.PollOption.events({
    'click #createPollButton': function() {
      Router.go("/createPoll")
    }
  });

  Template.CreatePoll.events({
    'click #submit': function(event) {
      var pollTitle = $("#poll-title").val();

      var poll = {
        title: pollTitle,
        yes: 0,
        no: 0
      };

      var addedPoll = Polls.insert(poll);
      document.getElementById("create-poll-form").reset();

      Router.go("/polls")
    }
  });

  Template.Polls.helpers({
    polls: function() {
      var lepolls = Polls.find().fetch();

      return lepolls;
    }
  });

  Template.Polls.events({
    "click #yes-button": function(event) {
      if(isNaN(this.yes)) {
        this.yes = 0;
      }

      this.yes++;

      Polls.update({_id: this._id}, {$set: {yes: this.yes}});

    },

    "click #no-button": function(event) {
      if(isNaN(this.no)) {
        this.no = 0;
      }

      this.no++;

      Polls.update({_id: this._id}, {$set: {no: this.no}});
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

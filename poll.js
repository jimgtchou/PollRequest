
Users = new Mongo.Collection("users");
Polls = new Mongo.Collection("polls");


Meteor.methods({
  newUser: function (username) {
    //
      if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Users.insert({
      question: question,
      createdAt: new Date(),
      wallet: wallet, // generate new wallet for user
      username: Meteor.user().username
    });
  },
  newPoll: function (question) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Polls.insert({
      question: question,
      yes: yesWalletId, //generate wallet and return the walletId
      no: noWalletId, //generate wallet and return the walletId
      createdAt: new Date(),
      eligableVoters: listofusernames, //parse a list of text of usernames by comma and space (or max voters)
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  // for hackathon version we assign the user who vote is voting with a pre-generated wallet
  // with 1 coin, rather than attach the wallets with 1 coin to the users when create poll
  votePoll: function (pollId, vote) {
    // voting Yes or No
    if(vote) {
      //transfer 1 coin to YES wallet
    } else if(!vote) {
      //transfer 1 coin to YES wallet
    }
  },

  transferVote: function (transferee, transferer) {
    // transfer coins from transferer wallet to the transferee
  },

  deleteTask: function (taskId) {
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});



Tasks = new Mongo.Collection("tasks");
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });
 
  Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
       var text = event.target.text.value;
 
      // Insert a task into the collection
      Meteor.call("addTask", text);
 
      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });


 
  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });
 
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
 
Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});
Router.route('/createPoll', function () {
  this.render('CreatePoll');
});

Router.route("/polls", function() {
  this.render("Polls");
});

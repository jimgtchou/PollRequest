Meteor.startup(function() {
  if(Meteor.isClient) {
    Session.setDefault("alerts", [])
  }
});


if (Meteor.isClient) {
  // counter starts at 0

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
      Router.go("/createPoll");
      // window.location.href = "/createPoll";
    }
  });

  Template.CreatePoll.events({
    'click #submit': function(event) {
      var pollTitle = $("#poll-title").val();
      var pollLimit = $("#poll-limit").val();

      var poll = {
        title: pollTitle,
        limit: pollLimit,
        yes: 0,
        no: 0,
        createdAt: new Date(),
        transactionHash: undefined,
        block: web3.eth.blockNumber
      };

      document.getElementById("create-poll-form").reset();

      var _options = "Yes No";
      var _title = poll.title;
      var _votelimit = poll.limit;
      var _deadline = 0;
      var abiDefinition = [{"constant":false,"inputs":[],"name":"endPoll","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"choice","type":"string"}],"name":"getVoteCountForChoice","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"p","outputs":[{"name":"owner","type":"address"},{"name":"title","type":"string"},{"name":"votelimit","type":"uint256"},{"name":"options","type":"string"},{"name":"deadline","type":"uint256"},{"name":"status","type":"bool"},{"name":"numVotes","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"choice","type":"string"},{"name":"token","type":"uint256"}],"name":"vote","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[{"name":"_options","type":"string"},{"name":"_title","type":"string"},{"name":"_votelimit","type":"uint256"},{"name":"_deadline","type":"uint256"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"votechoice","type":"string"}],"name":"NewVote","type":"event"}];
      var newpollContract = web3.eth.contract(abiDefinition);

      poll.abiDefinition = abiDefinition;

      var addedPoll = Polls.insert(poll);
      var newpoll = newpollContract.new(
         _options,
         _title,
         _votelimit,
         _deadline,
         {
           from: web3.eth.accounts[0],
           data: '6060604052604051610824380380610824833981016040528080518201919060200180518201919060200180519060200190919080519060200190919050505b33600060005060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508360006000506003016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100c557805160ff19168380011785556100f6565b828001600101855582156100f6579182015b828111156100f55782518260005055916020019190600101906100d7565b5b5090506101219190610103565b8082111561011d5760008181506000905550600101610103565b5090565b50508260006000506001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061017857805160ff19168380011785556101a9565b828001600101855582156101a9579182015b828111156101a857825182600050559160200191906001019061018a565b5b5090506101d491906101b6565b808211156101d057600081815060009055506001016101b6565b5090565b505081600060005060020160005081905550806000600050600401600050819055506001600060005060050160006101000a81548160ff0219169083021790555060006000600050600601600050819055505b505050506105eb806102396000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480638d99b2eb1461005a57806394cb6fc61461007d5780639ae8886a146100e7578063a63858031461024e57610058565b005b6100676004805050610558565b6040518082815260200191505060405180910390f35b6100d16004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610502565b6040518082815260200191505060405180910390f35b6100f460048050506102c1565b604051808873ffffffffffffffffffffffffffffffffffffffff16815260200180602001878152602001806020018681526020018581526020018481526020018381038352898181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101b55780601f1061018a576101008083540402835291602001916101b5565b820191906000526020600020905b81548152906001019060200180831161019857829003601f168201915b50508381038252878181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102385780601f1061020d57610100808354040283529160200191610238565b820191906000526020600020905b81548152906001019060200180831161021b57829003601f168201915b5050995050505050505050505060405180910390f35b6102ab6004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505090909190803590602001909190505061032e565b6040518082815260200191505060405180910390f35b60006000508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001016000509080600201600050549080600301600050908060040160005054908060050160009054906101000a900460ff16908060060160005054905087565b6000600060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415806103a957506001600060005060050160009054906101000a900460ff1614155b156103b757600090506104fc565b60016000600050600601600082828250540192505081905550600060005060070160005083604051808280519060200190808383829060006004602084601f0104600f02600301f15090500191505090815260200160405180910390206000818150548092919060010191905055507f24bcf19562365f6510754002f8d7b818d275886315d29c7aa04785570b97a3638360405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104a85780820380516001836020036101000a031916815260200191505b509250505060405180910390a1600060006000506002016000505411156104f3576000600050600201600050546000600050600601600050541015156104f2576104f0610558565b505b5b600190506104fc565b92915050565b6000600060005060070160005082604051808280519060200190808383829060006004602084601f0104600f02600301f1509050019150509081526020016040518091039020600050549050610553565b919050565b6000600060005060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105c057600090506105e8565b6000600060005060050160006101000a81548160ff02191690830217905550600190506105e8565b9056',
           gas: 3000000
         }, function(e, contract){
          console.log(e, contract);
          if (typeof contract.address != 'undefined') {
               console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
               Polls.update({_id: addedPoll}, {$set: {address: contract.address, transactionHash: contract.transactionHash}});

               // Testing code
               var gottenPoll = Polls.findOne({_id: addedPoll});

                var pollFromChain = web3.eth.contract(gottenPoll.abiDefinition).at(gottenPoll.address);

          }
       });

      Router.go("/polls");
      // window.location.href ="/polls";
    }
  });

  Template.Polls.helpers({
    polls: function() {
      return Polls.find({}, {sort: {createdAt: -1}});
    },
    hasAlerts: function() {
      return Session.get("alerts").length > 0;
    },
    alerts: function() {
      return Session.get("alerts");
    }
  });

  Template.Poll.helpers({
    withinLimit: function() {
      return this.yes + this.no < this.limit;
    }
  });

  Template.Polls.events({
    "click #yes-button": function(event) {
      var pollContract = web3.eth.contract(this.abiDefinition).at(this.address);

      var gasprice = web3.eth.gasPrice.toString(10);

      pollContract.vote("yes", 0, {from: web3.eth.accounts[0], gas: 200000, gasPrice: gasprice}, function(error,success) {
          console.log("I commited to a YES vote!");
          console.log("Err: " + error + " Success: " + success);

          var alerts = Session.get("alerts");

          if(alerts === undefined) {
            console.log("bad");
            return;
          }

          alerts.push("Your vote is sent to blackchain for verification! Hash: " + success);
          Session.set("alerts", alerts);

          //TODO: Use transaction id to make a list and link it to some 3rd party website.
      });

      var filter = pollContract.NewVote({}, {fromBlock: this.block, toBlock: 'latest'}, function(err, result) {
        if (!err) {
          console.log("Successfully vote! Result is: " + result);
          console.log("Successfully voted: " + result.args.votechoice)

          var alerts = Session.get("alerts");

          if(alerts === undefined) {
            console.log("bad");
            return;
          }

          alerts.push("Successfully voted! You voted: " + result.args.votechoice);

          Session.set("alerts", alerts);
        }
        else {
          console.log("Failed vote event! Err is: " + err);
        }
      });

      if(isNaN(this.yes)) {
        this.yes = 0;
      }

      this.yes++;

      Polls.update({_id: this._id}, {$set: {yes: this.yes}});
    },

    "click #no-button": function(event) {
      var pollContract = web3.eth.contract(this.abiDefinition).at(this.address);
      var gasprice = web3.eth.gasPrice.toString(10);


      pollContract.vote("no", 0, {from: web3.eth.accounts[0], gas: 200000, gasPrice: gasprice}, function(error,success) {
          console.log("I commited to a NO vote!");
          console.log("Err: " + error + " Success: " + success);
          //TODO: Use transaction id to make a list and link it to some 3rd party website.


          var alerts = Session.get("alerts");

          if(alerts === undefined) {
            console.log("bad");
            return;
          }

          alerts.push("Your vote is sent to blackchain for verification! Hash: " + success);
          Session.set("alerts", alerts);

      });

      var filter = pollContract.NewVote({}, {fromBlock: this.block, toBlock: 'latest'}, function(err, result) {
        if (!err) {
          console.log("Successfully vote! Result is: " + result);
          console.log("Successfully voted: " + result.args.votechoice)

          var alerts = Session.get("alerts");

          if(alerts === undefined) {
            console.log("bad");
            return;
          }

          alerts.push("Successfully voted! You voted: " + result.args.votechoice);

          Session.set("alerts", alerts);

        }
        else {
          console.log("Failed vote event! Err is: " + err);
        }
      });

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

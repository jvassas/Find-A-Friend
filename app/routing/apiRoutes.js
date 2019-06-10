var friendList = require("../data/friends");

module.exports = function(app) {
    
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        
        var friendMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var user = req.body;
        var userAnswers = userData.answers;

        var totalDifference = 0;

        for (var i =0; i < friends.length; i++) {

            console.log(friends[i].name);
            totalDifference = 0;

            for (var j = 0; j < friends[i].answers[j]; j++) {

                totalDifference += Math.abs(parseInt(userAnswers[j]) - parseInt(friends[i].answers[j]));

                if (totalDifference <= friendMatch.friendDifference) {

                    friendMatch.name = friends[i].name;
                    friendMatch.photo = friends[i].photo;
                    friendMatch.friendDifference = totalDifference;
                }
            }
        }
        
        friends.push(newUser);

        res.json(friendMatch);
    });
};
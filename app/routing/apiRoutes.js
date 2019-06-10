var friendList = require("../data/friends");

module.exports = function(app) {
    
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        
        //holds best match, 
        var friendMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        //result of user's survey 
        var userData = req.body;
        var userScores = userData.scores;

        //calculates difference between each user
        var totalDifference;

        //loop through matches 
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            //loop through scores
            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                //calculate difference in scores
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDifference <= friendMatch.friendDifference) {

                friendMatch.name = currentFriend.name;
                friendMatch.photo = currentFriend.photo;
                friendMatch.friendDifference = totalDifference;
            }
        }

        friends.push(userData);

        res.json(friendMatch);
    });
};
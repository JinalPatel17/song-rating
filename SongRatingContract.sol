//GPL 3 (general public license version 3) is a copyleft license
//meaning that any copy or modification of the original code must also be released under the GPL v3
//Copyleft is a general method for making a program (or other work) free //read more about copyleft: https://www.gnu.org/licenses/copyleft.en.html
//SPDX-License-Identifier: GPL-3.0
//This specifies the compiler version
pragma solidity >=0.4.22<0.9.0;

contract SongRatingContract {
    struct Rating {
        uint256 rating;
        string feedback;
    }
    
    mapping(uint256 => mapping(address => Rating)) public ratings;
    mapping(uint256 => mapping(address => bool)) public hasRated;
    mapping(uint256 => address[]) public songRaters;
    
    event SongRated(uint256 indexed songId, address indexed user, uint256 rating);
    event FeedbackProvided(uint256 indexed songId, address indexed user, string feedback);
    
    function rateSong(uint256 songId, uint256 rating) public {
        songRaters[songId].push(msg.sender);
        require(rating >= 1 && rating <= 5, "Rating should be between 1 and 5");
        require(!hasRated[songId][msg.sender], "User has already rated this song");
        
        ratings[songId][msg.sender].rating = rating;
        hasRated[songId][msg.sender] = true;
        
        emit SongRated(songId, msg.sender, rating);
    }
    
    function provideFeedback(uint256 songId, string memory feedback) public {
        ratings[songId][msg.sender].feedback = feedback;
        
        emit FeedbackProvided(songId, msg.sender, feedback);
    }
    
    function calculateAverageRating(uint256 songId) public view returns (uint256) {
        uint256 totalRating = 0;
        uint256 count = 0;

        address[] storage raters = songRaters[songId];

        for (uint256 i = 0; i < raters.length; i++) {
            Rating storage rating = ratings[songId][raters[i]];
            if (rating.rating > 0) {
                totalRating += rating.rating;
                count++;
            }
        }

        if (count > 0) {
            return totalRating / count;
        } else {
            return 0;
        }
    }
}
const Song_Rating_Contract = artifacts.require("SongRatingContract.sol");

module.exports = function(_deployer) {
  _deployer.deploy(Song_Rating_Contract);
};
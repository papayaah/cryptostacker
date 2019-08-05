var ScoreToken = artifacts.require('ScoreToken');

module.exports = function(deployer) {
  deployer.deploy(ScoreToken);
};

const Campaign= artifacts.require('Campaign')
module.exports = (deployer) => {
    deployer.deploy(Campaign);
};
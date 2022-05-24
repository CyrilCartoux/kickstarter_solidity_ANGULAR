const Campaign= artifacts.require('Campaign')
module.exports = async (deployer) => {
    const [alice, bob, paul] = await web3.eth.getAccounts();
    deployer.deploy(Campaign, '25000000000000000', 'Campaign to buy a car', alice);
};
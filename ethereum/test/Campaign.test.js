const {
  shouldThrow
} = require('./utils/helper')

const CampaignFactory = artifacts.require("CampaignFactory");
const Campaign = artifacts.require("Campaign");

contract("Campaign", (accounts) => {
  const [alice, bob, paul] = accounts;
  let campaignInstance;
  let instanceCampaignFactory;
  beforeEach(async () => {
    instanceCampaignFactory = await CampaignFactory.new();
    await instanceCampaignFactory.createCampaign('25000000000000000', 'Campaign to buy a car', {
      from: alice
    });
    const {
      campaignAddress,
      libelle
    } = await instanceCampaignFactory.deployedCampaigns(0, {
      from: alice
    });
    campaignInstance = await Campaign.new('25000000000000000', 'Campaign to buy a car', alice);
  });
  it('should deploy the campaign factory contract', async () => {
    assert(instanceCampaignFactory, "Contract campaign factory has been deployed !");
  })
  it("should deploy the campaign contract", async () => {
    assert(campaignInstance, "Contract campaign has been deployed")
  })
  // marks caller as the campaign manager
  it("should mark caller as the campaign manager", async () => {
    const manager = await campaignInstance.manager();
    assert.equal(manager, alice);
  })
  // it should return campaign count 
  it("should return campaign count", async () => {
    const count = await instanceCampaignFactory.campaignsCount();
    assert.equal(count, 1);
  })
  // it should return one campaign
  it("should return one campaign", async () => {
    const campaignReturned = await instanceCampaignFactory.deployedCampaigns(0);
    assert.ok(campaignReturned);
  })
  it('should allows people to contribute money and marks them as approvers', async () => {
    await campaignInstance.contribute({
      from: alice,
      value: web3.utils.toWei("1", "ether")
    });
    const isContributor = await campaignInstance.approvers(alice);
    assert(isContributor);
  });
  // it should require a minimum contribution
  it("should require a minimum contribution", async () => {
    await shouldThrow(campaignInstance.contribute({
      from: alice,
      value: "5"
    }));
  })
  // should allow a manager to make a payment request
  it("should allow a manager to make a payment request", async () => {
    await campaignInstance.createRequest("Buy batteries", "1000000", alice, {
      from: alice
    });
    const requests = await campaignInstance.requests(0);
    assert.equal("Buy batteries", requests.description);
  })
  // it processes requests
  it("processes requests", async () => {
    await campaignInstance.contribute({
      from: alice,
      value: web3.utils.toWei("10", "ether")
    });
    await campaignInstance.createRequest("A", web3.utils.toWei("5", "ether"), bob, {
      from: alice
    })
    await campaignInstance.approveRequest(0, {
      from: alice
    });
    await campaignInstance.finalizeRequest(0, {
      from: alice
    });
    let balance = await web3.eth.getBalance(bob);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    assert(balance >= 104.90);
  })
});
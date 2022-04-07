import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

// create contract instance 
const instance = new web3.eth.Contract(
    // abi / interface
    JSON.parse(CampaignFactory.interface),
    // address
    '0xF933cc1894EC2C9675a49bE3531dC03e7d2EEb35'
);

export default instance;
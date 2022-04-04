import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

// create contract instance 
const instance = new web3.eth.Contract(
    // abi / interface
    JSON.parse(CampaignFactory.interface),
    // address
    '0xb5CE6E3ea84fD2836559fC67A8b4E703418dC407'
);

export default instance;
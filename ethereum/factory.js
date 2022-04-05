import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

// create contract instance 
const instance = new web3.eth.Contract(
    // abi / interface
    JSON.parse(CampaignFactory.interface),
    // address
    '0x4BFF4AF6bbA80A9c4a8e0dd7702434F0b1BA9f96'
);

export default instance;
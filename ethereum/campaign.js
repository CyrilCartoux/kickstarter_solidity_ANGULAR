import web3 from "./web3";
import Campaign from './build/Campaign.json';

// create contract instance 

export default address => {
    return new web3.eth.Contract(
        // abi / interface
        JSON.parse(Campaign.interface),
        address
    )
};
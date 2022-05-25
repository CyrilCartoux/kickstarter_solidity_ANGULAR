import {web3} from "./web3-instance";
import CampaignFactory from '../../contracts/CampaignFactory.json';

const CampaignFactoryContract = new web3.eth.Contract(CampaignFactory.abi, "0x791F9a9e9e7E6b7Ef6370bde6c364e80889f613F");

export default CampaignFactoryContract;
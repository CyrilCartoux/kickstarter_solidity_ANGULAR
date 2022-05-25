import {web3} from './web3-instance';
import Campaign from '../../contracts/Campaign.json';

export default (address: string) => {
  return new web3.eth.Contract(Campaign.abi, address);
};

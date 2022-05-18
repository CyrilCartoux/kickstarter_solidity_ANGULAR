/**
 * Instanciate Web3
 */
import Web3 from 'web3';
let web3:any;

if (
  typeof (window as any) !== 'undefined' &&
  typeof (window as any).ethereum !== 'undefined'
) {
  // We are in the browser and metamask is running.
  (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3((window as any).ethereum);
  // Listens for metamask account change and reload the app
  (window as any).ethereum.on('accountsChanged', () => {
    window.location.reload();
  });
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    // `https://rinkeby.infura.io/v3/${process.env.INFURA_KICKSTARTER_PROJECTID}`
    'https://rinkeby.infura.io/v3/1203ff373fd94c31bd14adcd7962c938'
  );
  web3 = new Web3(provider);
}

export default web3;

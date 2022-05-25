import { environment } from './../../environments/environment';
/**
 * Instanciate Web3
 */
import Web3 from 'web3';
let web3: any;

const connectAccount = () => {
  if (
    typeof (window as any) !== 'undefined' &&
    typeof (window as any).ethereum !== 'undefined'
  ) {
    (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  }
}

if (
  typeof (window as any) !== 'undefined' &&
  typeof (window as any).ethereum !== 'undefined'
) {
  // We are in the browser and metamask is running.
  // (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3((window as any).ethereum);
  // Listens for metamask account change and reload the app
  (window as any).ethereum.on('accountsChanged', () => {
    window.location.reload();
  });
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${environment.infura_project_id}`
  );
  web3 = new Web3(provider);
}

export {web3, connectAccount};

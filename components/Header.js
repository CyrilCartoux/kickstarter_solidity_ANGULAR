import React, {Component} from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
import web3 from "../ethereum/web3";

class Header extends Component{
  constructor() {
    super();
    this.state = {accounts: null}
  }
  async componentDidMount() {
    const [accounts] =await web3.eth.getAccounts();
    this.setState({accounts})
  }
  showAddress() {
    if(this.state.accounts) {
      const start = this.state.accounts.slice(0, 5);
      const end = this.state.accounts.slice(-5);
      return start + "..." + end;
    }
  }
  render() {
    return (
      <Menu style={{ marginTop: "10px" }}>
        <Link route="/">
          <a className="item">EthStarter</a>
        </Link>
        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">{this.showAddress()}</a>
          </Link>
  
          <Link route="/campaigns/new">
            <a className="item">+</a>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
};

export default Header;

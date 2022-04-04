import React,{ Component }  from "react";
import { Card, Button } from "semantic-ui-react";
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import Layout from "../components/Layout";

class CampaignIndex extends Component {

    static async getInitialProps() {
        // fetch campaigns
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        // returns props object
        return {
            campaigns
        }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View campaign</a>,
                fluid: true
            }
        })

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open campaigns</h3>
                    <Button floated="right" content="Create Campaign" icon="add circle" primary />
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;
import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    // const campaigns = await factory.methods.getDeployedCampaigns().call();
    const campaignsCount = await factory.methods.getDeployedCampaignsCount().call();
    const campaigns = await Promise.all(
      Array(parseInt(campaignsCount))
        .fill()
        .map((element, index) => {
          return factory.methods.deployedCampaigns(index).call();
        })
    );
    return { campaigns };
  }
  renderCampaigns() {
    const items = this.props.campaigns.map((campaign) => {
      return {
        header: campaign.libelle,
        meta:(
          <p>{campaign.campaignAddress}</p>
        ),
        description: (
          <Link route={`/campaigns/${campaign.campaignAddress}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;

pragma solidity ^0.4.17;

contract CampaignFactory {
    CampaignStruct[] public deployedCampaigns;
    uint public campaignsCount = 0;
    struct CampaignStruct {
        address campaignAddress;
        string libelle;
    }

    function createCampaign(uint minimum, string memory lib) public {
        address newCampaign = new Campaign(minimum, lib, msg.sender);
        campaignsCount++;
        deployedCampaigns.push(CampaignStruct(newCampaign, lib));
    }

    function getDeployedCampaignsCount() public view returns (uint) {
        return campaignsCount;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    string public libelle;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum,string memory lib, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        libelle = lib;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        string,
        uint,
        uint, 
        uint,
        uint,
        address
    ) {
        return (
            libelle,
            minimumContribution, 
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
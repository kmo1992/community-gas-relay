// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);
}

contract CommunityGasRelay {
    address public relayer;
    address public supportedToken;
    uint256 public totalFeesPaid;
    uint256 public totalDonations;

    event FeePaid(address indexed payer, uint256 amount);
    event DonationReceived(address indexed donor, uint256 amount);

    constructor(address _supportedToken) {
        // Validate that the address is an ERC20 contract
        IERC20 token = IERC20(_supportedToken);
        require(token.totalSupply() > 0, "Not a valid ERC20 token");
        require(token.balanceOf(address(this)) == 0, "Not a valid ERC20 token");

        relayer = address(this);
        supportedToken = _supportedToken;
    }

    modifier onlyRelayer() {
        require(
            msg.sender == relayer,
            "Only the relayer can call this function"
        );
        _;
    }

    function payFee(address payer, uint256 amount) external onlyRelayer {
        IERC20 token = IERC20(supportedToken);
        require(token.transferFrom(payer, relayer, amount), "Transfer failed");
        totalFeesPaid += amount;
        emit FeePaid(payer, amount);
    }

    function donate() external payable {
        totalDonations += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

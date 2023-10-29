import { ethers } from 'ethers';

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID || "1337"; // Default to 1337 for localhost
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || "0xYourContractAddressHere";

export const getProvider = () => {
  // Initialize a Web3 provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
  // Ensure the user is connected to the correct network
  provider.getNetwork().then(network => {
    if (network.chainId.toString() !== CHAIN_ID) {
      alert(`Please switch to the correct network. Chain ID needed: ${CHAIN_ID}`);
    }
  });

  return provider;
};

export const getContract = (signer, abi) => {
  // Initialize the contract
  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
};

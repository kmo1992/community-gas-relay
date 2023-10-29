import React, { useEffect, useState } from 'react';
import { getProvider, getContract } from './utils';
import YourContractABI from './YourContractABI.json'; // Import the ABI of your contract

const Summary = () => {
  // Local state to hold the data fetched from the smart contract
  const [totalFeesPaid, setTotalFeesPaid] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Initialize provider and signer
      const provider = getProvider();
      const signer = provider.getSigner();
      
      // Initialize contract
      const contract = getContract(signer, YourContractABI);
      
      try {
        // Assuming your contract has getter methods getTotalFeesPaid and getTotalDonations
        const fees = await contract.getTotalFeesPaid();
        const donations = await contract.getTotalDonations();

        // Update local state with fetched data
        setTotalFeesPaid(fees.toNumber());
        setTotalDonations(donations.toNumber());
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once when component mounts

  return (
    <div className="summary-container">
      <h1>Community Gas Relay</h1>
      <p>Don't pay fees. Help those who can't pay fees.</p>
      
      <div className="summary-details">
        <p><strong>Total Fees Paid by Contract:</strong> {totalFeesPaid} MATIC</p>
        <p><strong>Total Number of Donations:</strong> {totalDonations}</p>
      </div>
    </div>
  );
};

export default Summary;

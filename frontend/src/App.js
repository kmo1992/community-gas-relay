import React from 'react';
import Summary from './Summary';
import Donate from './Donate';
import Transfer from './Transfer';

function App() {
  return (
    <div className="App">
      <h1>Community Gas Relay</h1>
      <p>Don't pay fees, and help those who can't.</p>
      <Summary />
      <Donate />
      <Transfer />
    </div>
  );
}

export default App;

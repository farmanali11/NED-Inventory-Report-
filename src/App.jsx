import React from 'react';
import Invoice from '../src/Components/InvoiceReport';
import './styles.css'; // Optional: Import styles

const App = () => {
  return (
    <div className="app">
      <h1>Invoice Generator</h1>
      <InvoiceReport />
    </div>
  );
};

export default App;
import React from 'react';
import InvoiceReport from './Components/InvoiceReport'; // Correct import
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice Generator</h1>
        <InvoiceReport /> {/* Correct usage */}
      </header>
    </div>
  );
}

export default App;
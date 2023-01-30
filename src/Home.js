import logo from './logo.svg';
import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to our invoice view. Click link below to view all invoice
        </p>
        <Link className="App-link" to="/Invoices">
          View Invoice
        </Link>
    </div>
  )
}

export default Home
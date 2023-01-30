

import React from 'react'
import { Table } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

const apiurl = "http://localhost:5030/api";


function Invoices({ setInvoice, setEdit}) {
    let pos = 0;

    const navigate = useNavigate();

const [invoices, populateInvoices] = useState([]); //To hold a list of invoices

  useEffect(() => {
    const userTokens = async () => {
      const res = await fetch(apiurl + "/Invoice");
  
      const data = await res.json();
  
      populateInvoices(data);

     };
  
    userTokens();
    }, []);


    //Function to redirect to single invoice page
  const singleInvoice = (inv) => {
    setInvoice(inv);
    navigate("/Invoice");

  };
  return (
    <>
        {
            invoices.length > 0 ? (
            <div>
                <h3>A list of all invoice available</h3>
                <hr></hr>
                <p className="text-right">
                <Link className="App-link" to="/AddInvoice" onClick={() => setEdit(false)}>
                    Add Invoice
                </Link></p>
                <Table bordered striped hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Invoice No.</th>
                    <th>Total Billable</th>
                    <th>Total Taxable</th>
                    <th>Server By</th>
                    <th>Date Served</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        invoices.map((inv) => (
                            <tr key={inv.invoiceID} onClick={() => singleInvoice(inv)} style={{ cursor: 'pointer' }} >
                                <td>{++pos}</td>
                                <td>{inv.invoiceID.toUpperCase()}</td>
                                <td>{inv.totalBillable}</td>
                                <td>{inv.totalTaxable}</td> 
                                <td>{inv.serverdBy}</td>
                                <td>{new Date(inv.dateCreated).toLocaleString()}</td>
                            </tr>
                        ))

                    }
                    
                </tbody>
                </Table>
            </div>
            ):
            (
                <div>
                     <h3>It seems you have no invoices</h3>
                    <Link className="App-link" to="/AddInvoice" onClick={() => setEdit(false)}>
                        Add Invoice
                    </Link>
                </div>
               
            )
        }
       
    </>
  )
}

export default Invoices

import React, { useState } from 'react'
import { Card, Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';

function AddInvoice({inv, isEdit}) {
    const navigate = useNavigate();

    const [invoiceId, setInvoiceID] = useState(inv.invoiceID && isEdit?inv.invoiceID:"");
    const [totalBillable, settotalBillable] = useState(inv.totalBillable && isEdit ?inv.totalBillable:"");
    const [totalTaxable, settotalTaxable] = useState(inv.totalTaxable && isEdit?inv.totalTaxable:"");
    const [serverdBy, setserverdBy] = useState(inv.serverdBy && isEdit?inv.serverdBy:"");

    //Used to capitalize invoice number
    const makeIvoiceNumber = (e) => {
        let invoiceNo = e.target.value.toUpperCase();

        setInvoiceID(invoiceNo);
    }

    //function to submit a post request
    const onSubmit = (e) => {
        e.preventDefault();

        submitInvoice();

        
    }

    const submitInvoice = async () => {
        let invoice = {
            invoiceId, 
            totalBillable, 
            totalTaxable, 
            serverdBy, 
            dateCreated: "2023-01-24T15:10:16.157"
        }

        const res = await fetch("http://localhost:5030/api/Invoice", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
    
            body: JSON.stringify(invoice),
          });
    
          const data = await res.json();
          //use data here

          navigate("/Invoices");

    }

  return (
    <>
        <h3>Fill the details below to add an Invoice</h3>
        <Card>
            <Card.Header>{isEdit ? 'Edit' : 'Create'} an Invoice</Card.Header>
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="mb-2">
                        <FormLabel>
                            Invoice Number
                        </FormLabel>
                        <FormControl type='text' placeholder='INV-000' name='invoiceID' disabled={isEdit}
                        value={invoiceId} onChange={(e) => makeIvoiceNumber(e)}>
                        </FormControl>
                        
                    </FormGroup>
                    <FormGroup className="mb-2">
                        <FormLabel>
                            Total Billable
                        </FormLabel>
                        <FormControl type='number' placeholder='total billable' name='totalBillable' 
                        value={totalBillable} onChange={(e) => settotalBillable(e.target.value)}>
   
                        </FormControl>
                    </FormGroup>
                    <FormGroup className="mb-2">
                        <FormLabel>
                            Total Taxable
                        </FormLabel>
                        <FormControl type='number' placeholder='total taxable' name='totalTaxable'
                        value={totalTaxable} onChange={(e) => settotalTaxable(e.target.value)}>
                            
                        </FormControl>
                    </FormGroup>
                    <FormGroup className="mb-2">
                        <FormLabel>
                            Served BY
                        </FormLabel>
                        <FormControl type='text' placeholder='Served by' name='serverdBy'
                        value={serverdBy} onChange={(e) => setserverdBy(e.target.value)}>
                        </FormControl>        
                    </FormGroup>
                    <Button variant="primary" type="submit" >
                        {isEdit?"Update invoice" : "Create the Invoice"}
                        
                    </Button>

                    <Button variant="primary-outline" type="submit"  style={{marginLeft:"20px"}}>
                        <Link to="/">Home</Link>   
                    </Button>
                    
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}

export default AddInvoice
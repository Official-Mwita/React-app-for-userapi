
import { Row, Col, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';


function Invoice({inv, setEdit}) {
  const navigate = useNavigate();

    const deleteInvoice = async () => {
      const res = await fetch("http://localhost:5030/api/Invoice/" + inv.invoiceID, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      });

      const data = await res.json();

      //use data here

      navigate("/Invoices");
    };


    const editInvoice = () => {
      setEdit(true);
      navigate("/AddInvoice")
    }
  return (
    <div>
        <h3>Invoice Details</h3>
        <Row>
            <Col xs={12} className="text-center">
                <p>Invoice Number: {inv.invoiceID.toUpperCase()}</p>
                <p>Total Taxable: {inv.totalTaxable}</p>
                <p>Total Billable: {inv.totalBillable}</p>
                <p>Date Created: {new Date(inv.dateCreated).toLocaleString()}</p>
                <p>Served By: {inv.serverdBy}</p>
                <p><Button variant='danger' onClick={deleteInvoice}>Delete</Button>
                   <Button style={{marginLeft:20}} onClick={editInvoice}>Edit</Button>
                   <Button variant = 'warning-outline' style={{marginLeft:20, color:"white"}}><Link to="/Invoices">Cancel</Link></Button></p>
            </Col>
        </Row>
    </div>
  )
}

export default Invoice
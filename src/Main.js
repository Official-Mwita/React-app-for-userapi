
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import Home from './Home'
import Invoices from './components/Invoices'
import Invoice from './components/Invoice'
import AddInvoice from './components/AddInvoice'

function Main() {
  const [invoice, setInvoice] = useState({});
  const [edit, setEdit] = useState(false);
  return (
    <Router>
      <Routes>
        <Route 
                path='/'
                element = {<Home />}
            />
            <Route 
                path='Invoices'
                element={<Invoices  setInvoice = {setInvoice} setEdit = {setEdit}/>}
            />
            <Route 
                path='Invoice'
                element={<Invoice inv = {invoice} setEdit = {setEdit}/>}
            />

          <Route 
                path='AddInvoice'
                element={<AddInvoice inv = {invoice} isEdit={edit}/>}
            />
      </Routes>
    </Router>
  )
}

export default Main
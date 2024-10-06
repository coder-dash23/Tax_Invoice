import React, { useState} from 'react';
import Datepic from "./Datepic";

export default function CompanyDetails() {
  const [formData, setFormData] = useState({
    invoicedate : 'Invoice Date',
    invoice: '#Invoice',
    date : 'Due Date',
    clientCountry: 'India',
    placeOfSupply: '',
    invoiceNumber: 'INV-12',
    BillTo : 'Bill To:',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const inputClass = "w-full py-0.5 px-1 rounded text-sm border border-transparent hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors";

  return (
    <div className="max-w-4xl mx-auto p-3 bg-white border-black rounded-lg">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1 space-y-1">
        <input
            type="text"
            name="BillTo"
            value={formData.BillTo}
            onChange={handleInputChange}
            className={`${inputClass} font-semibold`}
          /> <br />
          <input
            type="text"
            name="clientCompany"
            placeholder="Your Client's Company"
            className={inputClass}
          /> <br />
          <input
            type="text"
            name="clientGSTIN"
            placeholder="Client's GSTIN"
            className={inputClass}
          /> <br />
          <input
            type="text"
            name="clientAddress"
            placeholder="Client's Address"
            className={inputClass}
          /> <br />
          <input
            type="text"
            name="clientCity"
            placeholder="City"
            className={inputClass}
          /> <br />
          <input
            type="text"
            name="clientState"
            placeholder="State"
            className={inputClass}
          />
          <select
            name="clientCountry"
            value={formData.clientCountry}
            onChange={handleInputChange}
            className={inputClass}
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select> <br /><br />
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm mx-1">Place Of Supply:</span>
            <input
              type="text"
              name="placeOfSupply"
              placeholder="State"
              className={`${inputClass} flex-1`}
            />
          </div>
        </div>
        <div className="flex-1 space-y-1 mt-4 md:mt-0">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm"><input
            type="text"
            name="invoice"
            value={formData.invoice}
            onChange={handleInputChange}
            className={`${inputClass} font-semibold`}
          /></span>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleInputChange}
              className= "mx-5 rounded border border-transparent hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm"><input
            type="text"
            name="invoicedate"
            value={formData.invoicedate}
            onChange={handleInputChange}
            className={`${inputClass} font-semibold`}
          /></span>
            <div className="flex items-center space-x-1.5 rounded border border-transparent hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors">
              <svg className="w-4 h-4 text-gray-500 hover:border-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg> 
              <Datepic/>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm"><input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`${inputClass} font-semibold`}
          /></span>
            <div className="flex items-center space-x-1.5 rounded border border-transparent hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <Datepic/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



import React, { useState, useRef } from 'react';

export default function UploadSection() {
  const [formData, setFormData] = useState({
    companyName: '',
    yourName: '',
    companyGSTIN: '',
    companyAddress: '',
    city: '',
    state: '',
    country: 'Panama',
  });

  const [logo, setLogo] = useState(null);
  const [SubHeading,setSubHeading] = useState('TAX INVOICE');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('File size should not exceed 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const inputClass = "w-1/2 py-1 px-2 text-sm border border-transparent rounded hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors";

  return (
    <div className="max-w-4xl mx-auto p-3 bg-white rounded-lg">
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div 
            className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={triggerFileInput}
          >
            {logo ? (
              <img src={logo} alt="Company Logo" className="max-w-full max-h-full" />
            ) : (
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm text-gray-500">Upload</span>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleLogoUpload}
          />
          <div>
            <h3 className="font-semibold">Upload Logo</h3>
            <p className="text-xs text-gray-500">240 x 240 pixels @ 72 DPI,<br />Maximum size of 1MB.</p>
          </div>
        </div>
    <input
                  type="text"
                  value={SubHeading}
                  onChange={(e) => setSubHeading(e.target.value)}
                  className={`${inputClass} text-5xl text-center`}
                />
      </div>
      <div className="space-y-0 ">
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Your Company"
          className={inputClass}
        /> <br />
        <input
          type="text"
          name="yourName"
          value={formData.yourName}
          onChange={handleInputChange}
          placeholder="Your Name"
          className={inputClass}
        /> <br />
        <input
          type="text"
          name="companyGSTIN"
          value={formData.companyGSTIN}
          onChange={handleInputChange}
          placeholder="Company's GSTIN"
          className={inputClass}
        /> <br />
        <input
          type="text"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleInputChange}
          placeholder="Company's Address"
          className={inputClass}
        /> <br />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
          className={inputClass}
        /> <br />
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          placeholder="State"
          className={inputClass}
        /> <br />
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className={`${inputClass} bg-white`}
        >
        <option value="Panama">Panama</option>
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
        </select>
      </div>
    </div>
  );
}

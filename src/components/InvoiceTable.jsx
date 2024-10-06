import React, { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react"; // Import the X icon

export default function InvoiceTable(props) {
  const [formData, setFormData] = useState({
    notevalue: "It was great doing business with you.",
    termsvalue: "Please make the payment by the due date.",
    Notes: "Notes",
    termsandcondion: "Terms & Conditions",
    clientCompany: "",
    clientGSTIN: "",
    description: "Item description",
    qty: "Qty",
    rate: "Rate",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputClass =
    "w-full py-0.5 px-1 text-sm rounded border border-transparent hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors";

  const [items, setItems] = useState([
    {
      description: "Brochure Design",
      hsn: "",
      qty: 2,
      rate: 100.0,
      sgst: 6,
      cgst: 6,
      cess: 0,
    },
    { description: "", hsn: "", qty: 1, rate: 0.0, sgst: 0, cgst: 0, cess: 0 },
    { description: "", hsn: "", qty: 1, rate: 0.0, sgst: 0, cgst: 0, cess: 0 },
  ]);

  const [currency, setCurrency] = useState("₹");
  const [totalLabel, setTotalLabel] = useState("TOTAL");
  const [SubTotalLabel, setSubTotalLabel] = useState("Sub Total");

  const addLineItem = () => {
    setItems([
      ...items,
      {
        description: "",
        hsn: "",
        qty: 1,
        rate: 0.0,
        sgst: 0,
        cgst: 0,
        cess: 0,
      },
    ]);
  };

  const deleteLineItem = (index) => {
    if (index > 0) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);

    if (
      index === items.length - 1 &&
      field === "description" &&
      value.trim() !== ""
    ) {
      addLineItem();
    }
  };

  const calculateAmount = (item) => {
    return item.qty * item.rate;
  };

  const calculateTax = (amount, rate) => {
    return (amount * rate) / 100;
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const amount = calculateAmount(item);
      const sgst = calculateTax(amount, item.sgst);
      const cgst = calculateTax(amount, item.cgst);
      return total + amount + sgst + cgst;
    }, 0);
  };

  const [activeHeader, setActiveHeader] = useState(null);
  const ref = useRef(null);

  const handleHeaderClick = (index) => {
    setActiveHeader(index);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setActiveHeader(null); // Reset active header when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-3" ref={props.data}>
      <table className="w-full" ref={ref}>
        <thead>
          <tr className="bg-black text-white h-10">
            <td className="text-left w-full">
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`${inputClass} rounded font-semibold ${
                  activeHeader === 0
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
                onClick={() => handleHeaderClick(0)}
              />
            </td>
            <td className="text-center">
              <input
                type="text"
                name="qty"
                value={formData.qty}
                onChange={handleInputChange}
                className={`${inputClass} font-semibold text-center rounded ${
                  activeHeader === 1
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
                onClick={() => handleHeaderClick(1)}
              />
            </td>
            <td className="text-center">
              <input
                type="text"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
                className={`${inputClass} font-semibold text-center ${
                  activeHeader === 2
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
                onClick={() => handleHeaderClick(2)}
              />
            </td>
            <td className="text-center font-semibold">SGST</td>
            <td className="text-center font-semibold">CGST</td>
            <td className="text-center font-semibold">Cess</td>
            <td className="text-left font-semibold">Amount</td>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b group">
              <td className="p-1">
                <textarea
                  className = {`${inputClass} w-full min-h-[2em] resize-both focus:outline-none`}
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                  placeholder="Enter item name/description"
                />
                <input
                  type="text"
                  className= {`${inputClass} w-full min-h-[2em] resize-both focus:outline-none`}
                  placeholder="HSN/SAC"
                  value={item.hsn}
                  onChange={(e) => updateItem(index, "hsn", e.target.value)}
                />
              </td>
              <td className="p-2 text-center">
                <input
                  type="number"
                  className="w-20 text-center focus:outline-none rounded-md transition-colors hover:border hover:border-blue-500"
                  value={item.qty}
                  onChange={(e) =>
                    updateItem(index, "qty", parseFloat(e.target.value) || 0)
                  }
                />
              </td>
              <td className="p-2 text-center">
                <input
                  type="number"
                  className="w-20 text-center focus:outline-none rounded-md transition-colors hover:border hover:border-blue-500"
                  value={item.rate}
                  onChange={(e) =>
                    updateItem(index, "rate", parseFloat(e.target.value) || 0)
                  }
                />
              </td>
              <td className="p-2 text-center">
                <input
                  type="number"
                  className="w-20 text-center focus:outline-none rounded-md transition-colors hover:border hover:border-blue-500"
                  value={item.sgst}
                  onChange={(e) =>
                    updateItem(index, "sgst", parseFloat(e.target.value) || 0)
                  }
                />
                <div className="text-sm text-gray-500">
                  {calculateTax(calculateAmount(item), item.sgst).toFixed(2)}
                </div>
              </td>
              <td className="p-2 text-center">
                <input
                  type="number"
                  className="w-20 text-center focus:outline-none rounded-md transition-colors hover:border hover:border-blue-500"
                  value={item.cgst}
                  onChange={(e) =>
                    updateItem(index, "cgst", parseFloat(e.target.value) || 0)
                  }
                />
                <div className="text-sm text-gray-500">
                  {calculateTax(calculateAmount(item), item.cgst).toFixed(2)}
                </div>
              </td>
              <td className="p-2 text-center">
                <input
                  type="number"
                  className="w-20 text-center focus:outline-none rounded-md transition-colors hover:border hover:border-blue-500"
                  value={item.cess}
                  onChange={(e) =>
                    updateItem(index, "cess", parseFloat(e.target.value) || 0)
                  }
                />
                <div className="text-sm text-gray-500">0.00</div>
              </td>
              <td className="p-2 text-center relative">
                <span>{calculateAmount(item).toFixed(2)}</span>
                <button
                  className="absolute top-3 right-0 bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteLineItem(index)}
                >
                  <X className="w-3 h-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="flex items-center text-blue-500 hover:text-blue-700"
          onClick={addLineItem}
        >
        <Plus className="w-4 h-4 mr-1" />
          Add Line Item
        </button>
      </div>
      <div className="flex justify-end -mt-6">
        <table className="w-64">
          <tbody>
            <tr>
              <td className="p-1">
                <input
                  type="text"
                  value={SubTotalLabel}
                  onChange={(e) => setSubTotalLabel(e.target.value)}
                  className={inputClass}
                />
              </td>
              <td className="p-1 text-right">
                {items
                  .reduce((total, item) => total + calculateAmount(item), 0)
                  .toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="p-1">SGST(6%)</td>
              <td className="p-1 text-right">
                {items
                  .reduce(
                    (total, item) =>
                      total + calculateTax(calculateAmount(item), item.sgst),
                    0
                  )
                  .toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="p-1">CGST(6%)</td>
              <td className="p-1 text-right">
                {items
                  .reduce(
                    (total, item) =>
                      total + calculateTax(calculateAmount(item), item.cgst),
                    0
                  )
                  .toFixed(2)}
              </td>
            </tr>
            <tr className="font-bold bg-slate-50">
              <td className="p-1">
                <input
                  type="text"
                  value={totalLabel}
                  onChange={(e) => setTotalLabel(e.target.value)}
                  className={`${inputClass} bg-slate-50`}
                />
              </td>
              <td className="p-1 text-right flex items-center justify-end">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mr-1 focus:outline-none bg-transparent bg-[#fef7e0]"
                >
                  <option value="₹">₹</option>
                  <option value="$">$</option>
                  <option value="€">€</option>
                </select>
                <div className="px-2 py-1 border rounded flex items-center">
                  <span>{calculateTotal().toFixed(2)}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-1">
      <input
        type="text"
        name="Notes"
        value={formData.Notes}
        onChange={handleInputChange}
        className={`${inputClass} font-semibold`}
      />{" "}
      <br />
      <textarea
        name="notevalue"
        value={formData.notevalue}
        onChange={handleInputChange}
        className={inputClass}
      ></textarea>
      <br />
      <br />
      <input
        type="text"
        name="termsandcondion"
        value={formData.termsandcondion}
        onChange={handleInputChange}
        className={`${inputClass} font-semibold`}
      />{" "}
      <br />
      <textarea
        name="termsvalue"
        value={formData.termsvalue}
        onChange={handleInputChange}
        className={inputClass}
      ></textarea>

      </div>
     
    </div>
  );
}







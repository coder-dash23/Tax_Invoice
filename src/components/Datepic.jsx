import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Datepic = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
      <div className="border-transparent">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MMM dd, yyyy"
          className="focus:outline-none" // Remove border on focus
        />
    </div>
  );
};

export default Datepic;

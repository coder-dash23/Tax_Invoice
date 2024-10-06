import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import UploadSection from './components/UploadSection';
import CompanyDetails from './components/CompanyDetails';
import InvoiceTable from './components/InvoiceTable';

const App = () => {
  const contentRef = useRef(); // Create a ref to capture the content

  // Function to generate PDF
  const generatePdf = () => {
    const input = contentRef.current;

    // Capture the content of the page as a canvas
    html2canvas(input, {
      scale: 3, // Increase scale for better quality (3x the resolution)
      useCORS: true, // Enable cross-origin resource sharing (if images are external)
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 page in portrait mode
      const imgWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height to maintain aspect ratio
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to the first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // If the content overflows, add more pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage(); // Add a new page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); // Add the image to the new page
        heightLeft -= pageHeight;
      }

      pdf.save('invoice.pdf'); // Save the generated PDF
    });
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg border border-blue-500">
      {/* Ref to capture content */}
      <div ref={contentRef}>
        <UploadSection />
        <CompanyDetails />
        <InvoiceTable />
      </div>

      {/* PDF Download and Print Options */}
      <div className="mt-5 flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={generatePdf} // Call the generate PDF function
        >
          Download PDF
        </button>

        {/* Print button */}
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.print()} // Trigger print dialog
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default App;

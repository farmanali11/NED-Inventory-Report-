import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.png"; // Ensure the logo is high-quality
import "../styles/InvoiceReport.css";

const InvoiceReport = () => {
  const invoiceRef = useRef();
  const [rowsToShow, setRowsToShow] = useState(10);
  const [date, setDate] = useState("");
  const [poNumber, setPoNumber] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
    setPoNumber(`PO-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  const invoiceData = {
    university: "NED University of Engineering & Technology",
    directorate: "Directorate of Services",
    code: "F/SOP/DOS 01/36/00",
    department: "Automotives",
    purpose: "",
    items: new Array(100).fill(null).map((_, index) => ({
      sn: (index + 1).toString().padStart(2, "0"),
      description: `Item ${index + 1}`,
      unit: "Piece",
      qtyRegd: "10",
      qtyReceived: "10",
      storePostReference: `Ref-${index + 1}`,
    })),
  };

  const handleRowChange = (e) => {
    setRowsToShow(parseInt(e.target.value, 10));
  };

  const handlePurposeChange = (e) => {
    invoiceData.purpose = e.target.value;
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFont("helvetica", "bold");

    // Add Header
    doc.setFontSize(18);
    doc.setTextColor(26, 35, 126); // Dark blue color
    doc.text(invoiceData.university, 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text(invoiceData.directorate, 105, 28, { align: "center" });

    // Add Logo
    doc.addImage(logo, "PNG", 160, 10, 30, 20); // Adjust logo size and position

    // Add Invoice Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Code No: ${invoiceData.code}`, 15, 45);
    doc.text(`Department: ${invoiceData.department}`, 150, 45);
    doc.text(`Date: ${date}`, 150, 52);

    doc.setFontSize(14);
    doc.text(`PO No: ${poNumber}`, 15, 60);

    // Add Table
    const headers = [["S/N", "Description", "Unit", "Qty Regd.", "Qty Received", "Store Reference"]];
    const data = invoiceData.items.slice(0, rowsToShow).map((item) => [
      item.sn,
      item.description,
      item.unit,
      item.qtyRegd,
      item.qtyReceived,
      item.storePostReference,
    ]);

    autoTable(doc, {
      startY: 65,
      head: headers,
      body: data,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 4,
        halign: "center",
        valign: "middle",
        textColor: [0, 0, 0], // Black text
      },
      headStyles: {
        fillColor: [26, 35, 126], // Dark blue header
        textColor: [255, 255, 255], // White text
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Light gray alternate rows
      },
      columnStyles: {
        0: { cellWidth: 15 }, // S/N column width
        1: { cellWidth: 50 }, // Description column width
        2: { cellWidth: 20 }, // Unit column width
        3: { cellWidth: 25 }, // Qty Regd. column width
        4: { cellWidth: 25 }, // Qty Received column width
        5: { cellWidth: 40 }, // Store Reference column width
      },
    });

    // Add Footer
    const finalY = doc.lastAutoTable.finalY || 65;
    doc.setFontSize(12);
    doc.setTextColor(26, 35, 126); // Dark blue color
    doc.text("Initiated By: ___________", 15, finalY + 15);
    doc.text("Authorized By: ___________", 100, finalY + 15);
    doc.text("Issued By: ___________", 15, finalY + 25);
    doc.text("Received By: ___________", 100, finalY + 25);
    doc.text("Remarks: ___________", 15, finalY + 35);

    // Save the PDF
    doc.save("Invoice_Report.pdf");
  };

  return (
    <div className="invoice-container" ref={invoiceRef}>
      <div className="invoice-header">
        <div className="header-content">
          <h2 className="university-name">{invoiceData.university}</h2>
          <h3 className="directorate">{invoiceData.directorate}</h3>
        </div>
        <img src={logo} alt="Logo" className="header-logo" />
      </div>

      <div className="invoice-info">
        <table>
          <tbody>
            <tr>
              <td><strong>Code No:</strong> {invoiceData.code}</td>
              <td><strong>Department:</strong> {invoiceData.department}</td>
            </tr>
            <tr>
              <td>
                <strong>Purpose:</strong>
                <input type="text" placeholder="Enter purpose" onChange={handlePurposeChange} />
              </td>
              <td><strong>Date:</strong> {date}</td>
            </tr>
            <tr>
              <td colSpan="2"><strong>{poNumber}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="filter-container">
        <label>Show Rows: </label>
        <select value={rowsToShow} onChange={handleRowChange}>
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
        <button className="pdf-button" onClick={generatePDF}>Download PDF</button>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Description</th>
            <th>Unit</th>
            <th>Qty Regd.</th>
            <th>Qty Received</th>
            <th>Store Reference</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.slice(0, rowsToShow).map((item, index) => (
            <tr key={index}>
              <td>{item.sn}</td>
              <td>{item.description}</td>
              <td>{item.unit}</td>
              <td>{item.qtyRegd}</td>
              <td>{item.qtyReceived}</td>
              <td>{item.storePostReference}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-footer">
        <div className="footer-left">
          <p>Initiated By: _____________</p>
          <p>Authorized By: _____________</p>
        </div>
        <div className="footer-right">
          <p>Issued By: _____________</p>
          <p>Received By: _____________</p>
        </div>
      </div>
      <div className="invoice-footer-center">
        <p>Remarks: _____________</p>
      </div>
    </div>
  );
};

export default InvoiceReport;
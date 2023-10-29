import React, { useState } from 'react';

function ReportViolationForm() {
  const [productId, setProductId] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic here, e.g., save to database or notify the admin.
    console.log({
      productId,
      reason,
      description
    });
  };

  return (
    <div>
      <h2>Report Product Violation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reason:</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)} required>
            <option value="">Select a reason</option>
            <option value="inappropriate_content">Inappropriate Content</option>
            <option value="counterfeit">Counterfeit</option>
            // Add more reasons as needed
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default ReportViolationForm;

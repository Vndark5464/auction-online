import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

function ReportViolationForm() {
  const [productId, setProductId] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Thêm dữ liệu vào collection "report"
    try {
      const reportRef = collection(getFirestore(), 'report');
      await addDoc(reportRef, {
        productId,
        reason,
        description,
        timestamp: serverTimestamp() // Thêm timestamp nếu bạn muốn
      });
      alert('Report submitted successfully!');
    } catch (error) {
      console.error("Error adding report: ", error);
      alert('Failed to submit report. Please try again.');
    }
  };
  return (
    <div role="form" aria-labelledby="report-product-title">
    <h2 id="report-product-title">Report Product Violation</h2>
    <form onSubmit={handleSubmit} noValidate>
        <div class="form-group">
            <label for="product-id">Product ID:</label>
            <input
                id="product-id"
                class="form-control"
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                aria-required="true"
            />
        </div>
        <div class="form-group">
            <label for="reason">Reason:</label>
            <select id="reason" class="form-control" value={reason} onChange={(e) => setReason(e.target.value)} required aria-required="true">
                <option value="">Select a reason</option>
                <option value="inappropriate_content">Inappropriate Content</option>
                <option value="counterfeit">Counterfeit</option>

            </select>
        </div>
        <div class="form-group">
            <label for="description">Description:</label>
            <textarea
                id="description"
                class="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                aria-required="true"
            ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit Report</button>
    </form>
</div>
  );
}

export default ReportViolationForm;

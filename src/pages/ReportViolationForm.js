import React, { useState } from 'react';
import { db } from '../firebase-config';

function ReportViolationForm() {
  const [productId, setProductId] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Tạo một object chứa thông tin báo cáo
    const reportData = {
      productId,
      reason,
      description,
      // Thêm thời gian báo cáo hoặc các thông tin khác bạn muốn lưu
    };
  
    try {
      // Thêm dữ liệu vào collection "report"
      await db.collection('report').add(reportData);
      console.log('Báo cáo đã được lưu vào Firestore.');
    } catch (error) {
      console.error('Lỗi khi lưu báo cáo vào Firestore:', error);
    }
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

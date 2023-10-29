import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import MenuAdmin from './menu-admin';

function AdminReportPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu từ collection "report"
    const fetchReports = async () => {
      const reportRef = collection(getFirestore(), 'report');
      const reportSnapshot = await getDocs(reportRef);
      const reportData = reportSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(reportData);
    };

    fetchReports();
  }, []);

  return (
    <>
    <div role="table" aria-labelledby="admin-report-title">
    
    <div className="container mt-5">
    <MenuAdmin />
            <h1>Danh sách báo cáo</h1>
    </div>
  <table className="table table-striped" style={{width: '50%', margin: 'auto'}}>
    <thead>
      <tr>
        <th scope="col">User ID</th>
        <th scope="col">Username</th>
        <th scope="col">Product ID</th>
        <th scope="col">Reason</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      {reports.map(report => (
        <tr key={report.id}>
          <td>{report.userId}</td>
          <td>{report.username}</td>
          <td>{report.productId}</td>
          <td>{report.reason}</td>
          <td>{report.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</>
  );
}

export default AdminReportPage;

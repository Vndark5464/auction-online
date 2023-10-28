import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function RevenueGraph() {
  const [chartData, setChartData] = useState({});

  const fetchData = async () => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    let dailyRevenue = Array(7).fill(0);
    let labels = Array(7).fill('');

    for(var i = 0; i < 7; i++){
      labels[i] = formatDate(new Date(Date.now() - (7 - 1 - i) * 24 * 60 * 60 * 1000));
      const day = labels[i];
      const startOfDay = new Date(day).toISOString();

      const endOfDayDate = new Date(day);
      endOfDayDate.setHours(23, 59, 59, 999);
      const endOfDay = endOfDayDate.toISOString();

      const oneDayProductsQuery = query(
        collection(db, "finishedProducts"),
        where("approvedTime", ">=", startOfDay),
        where("approvedTime", "<=", endOfDay),
        orderBy("approvedTime", "asc")
      );
      
      const oneDayProductsSnap = await getDocs(oneDayProductsQuery);
      dailyRevenue[i] = oneDayProductsSnap.docs.reduce((total, doc) => total + Number(doc.data().price), 0);
    }

    setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Doanh thu hàng ngày',
            data: dailyRevenue,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      }); 
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div>
      {chartData && <Line data={chartData} />}
    </div>
  );
}

function formatDate(date) {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');  
  var yyyy = date.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
}

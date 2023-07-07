import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

const LastSalesPage: NextPage<any> = () => {
  const [sales, setSales] = useState<any>();
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch('https://nextjs-course-04-831d3-default-rtdb.firebaseio.com/sales.json')
      .then((res) => res.json())
      .then((data) => {
        const transformedSales = [];

        for (const key in data) {
          transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
        }

        setSales(transformedSales);
        setLoading(false);
      });
  }, []);

  if (Loading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <>No data!</>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;

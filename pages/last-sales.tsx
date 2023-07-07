import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage: NextPage<any> = () => {
  const [sales, setSales] = useState<any>();
  //   const [Loading, setLoading] = useState(false);
  const { data, error } = useSWR('https://nextjs-course-04-831d3-default-rtdb.firebaseio.com/sales.json', (url) => fetch(url).then((res) => res.json()));

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   useSWR(<request-url>, (url) => fetch(url).then(res => res.json()));
  //   useEffect(() => {
  //     setLoading(true);
  //     fetch('https://nextjs-course-04-831d3-default-rtdb.firebaseio.com/sales.json')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
  //         }

  //         setSales(transformedSales);
  //         setLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <>Failed!</>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
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

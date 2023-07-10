import fs from 'fs/promises';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import path from 'path';
import { Products } from '../interfaces/Interfaces';

const HomePage: NextPage<Products> = (props) => {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('regenerate');
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(String(jsonData)) as Products;

  if (!data) {
    return { props: { products: [] }, redirect: '/nothing' };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: { products: data.products },
    revalidate: 10,
  };
};

export default HomePage;

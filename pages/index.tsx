import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async (context) => {
  console.log('regenerate');
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(String(jsonData));

  if (!data) {
    return { redirect: '/nothing' };
  }

  if (data.products.lenght === 0) {
    return { notFound: true };
  }

  return {
    props: { products: data.products },
    revalidate: 10,
  };
};

export default HomePage;

import fs from 'fs/promises';
import path from 'path';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>{item.title}</li>
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

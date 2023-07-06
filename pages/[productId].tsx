import React from 'react';
import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>{loadedProduct.title}</h2>
      <h6>{loadedProduct.description}</h6>
    </>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const productId = params.productId;
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(String(jsonData));
  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { productId: 'p1' } }],
    // if we use fallback:'blocking' then next will take a bit more to load the page
    // fallback: 'blocking',
    // if we use fallback true then we can set a spinner while we wait for the page to load
    fallback: true,
  };
};

export default ProductDetailPage;

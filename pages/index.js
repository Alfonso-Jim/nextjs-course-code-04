function HomePage(props) {
  const { data } = props;
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      data: [
        { id: '01', name: 'example1' },
        { id: '02', name: 'example2' },
      ],
    },
  };
};

export default HomePage;

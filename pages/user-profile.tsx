import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { User } from '../interfaces/Interfaces';

const userProfile: NextPage<User> = (props) => {
  return <div>{props.username}</div>;
};

export default userProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res } = context;

  return {
    props: {
      username: 'Poncho',
    },
  };
};

import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { User } from '../interfaces/interfaces';

const userProfile: NextPage<User> = (props) => {
  return <div>{props.username}</div>;
};

export default userProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: 'Poncho',
    },
  };
};
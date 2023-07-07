import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { UserId } from '../interfaces/Interfaces';

const UserIdPage: NextPage<UserId> = (props) => {
  return <div>{props.id}</div>;
};

export default UserIdPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const userId = params.uid;

  return {
    props: {
      id: 'userid-' + userId,
    },
  };
};

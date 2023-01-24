import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { IUser } from './types';
import { useState } from 'react';

const Postcard = () => {
  const [user, setUser] = useState<IUser>();
  return (
    <Card className="text-center my-5">
      <Card.Img variant="top" src={user?.image} />
      <Card.Body>
        <Card.Title>{user?.title}</Card.Title>
        <Card.Text>{user?.message}</Card.Text>
        <a href={user?.link} className="btn btn-primary">
          Learn more
        </a>
      </Card.Body>
    </Card>
  );
};

export default Postcard;

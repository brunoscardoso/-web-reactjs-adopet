import React from 'react';

import { Container, Photo, Title, Description } from './styles';

interface Props {
  photoUrl: string;
  name: string;
  gender: string;
}

const CardPet: React.FC<Props> = ({ photoUrl, name, gender }) => {
  return (
    <Container>
      <Photo src={photoUrl} alt="adopet" />
      <Title>{name}</Title>
      <Description>{gender}</Description>
    </Container>
  );
};

export default CardPet;

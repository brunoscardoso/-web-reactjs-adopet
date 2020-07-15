import React from 'react';

import {
  Container,
  ContentContainer,
  Header,
  MainContainer,
  Logo,
  TitleText,
  DescriptionText,
  AdoptButton,
  RegisterButton,
  IconContainer,
  HeartIcon,
  DogIcon,
  TextButon,
} from './styles';

import logo from '../../assets/logo.png';

const Home: React.FC = () => {
  return (
    <Container id="page-home">
      <ContentContainer className="content">
        <Header>
          <Logo src={logo} alt="AdoPet" />
        </Header>

        <MainContainer>
          <TitleText>Você quer adotar ou cadastrar um novo Pet?</TitleText>
          <DescriptionText>
            Nós ajudamos a dar um novo lar <br /> para os caramelos!
          </DescriptionText>

          <AdoptButton to="/adopt-pet">
            <IconContainer>
              <HeartIcon />
            </IconContainer>
            <TextButon>Adotar</TextButon>
          </AdoptButton>

          <RegisterButton to="/register-pet">
            <IconContainer>
              <DogIcon />
            </IconContainer>
            <TextButon>Cadastrar</TextButon>
          </RegisterButton>
        </MainContainer>
      </ContentContainer>
    </Container>
  );
};

export default Home;

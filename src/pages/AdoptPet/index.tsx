import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import {
  Container,
  Header,
  BackText,
  BackIcon,
  Logo,
  FormContainer,
  Fields,
  Title,
  FieldGroup,
  UFDropdown,
  Field,
  Option,
  CityDropdown,
  LabelText,
  SearchButton,
  DogIcon,
  List,
  TextButton,
  ListUL,
} from './styles';

import CardPet from '../../components/CardPet';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface PetsArray {
  id: number;
  name: string;
  size: string;
  gender: string;
  photoUrl: string;
}

const AdoptPet: React.FC = () => {
  const [pets, setPets] = useState<PetsArray[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios
    `,
      )
      .then((response) => {
        const cityName = response.data.map((city) => city.nome);
        setCities(cityName);
      });
  }, [selectedUf]);

  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>): void => {
    const uf = event.target.value;
    setSelectedUf(uf);
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>): void => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  async function handleSearchPets(): Promise<void> {
    const response = await api.get(
      `pets?city=${selectedCity}&uf=${selectedUf}`,
    );
    setPets(response.data);
  }

  return (
    <Container id="page-adopt-pet">
      <Header>
        <BackText to="/">
          <BackIcon />
          Voltar
        </BackText>
        <Logo src={logo} alt="adopet" />
      </Header>
      <FormContainer>
        <Fields>
          <Title>De onde você é?</Title>
          <FieldGroup>
            <Field>
              <LabelText>Estado</LabelText>
              <UFDropdown value={selectedUf} onChange={handleSelectUf}>
                <Option value="0">UF</Option>
                {ufs.map((uf) => (
                  <Option key={uf} value={uf}>
                    {uf}
                  </Option>
                ))}
              </UFDropdown>
            </Field>
            <Field>
              <LabelText>Cidade</LabelText>
              <CityDropdown value={selectedCity} onChange={handleSelectCity}>
                <Option value="0">Selecione a sua Cidade</Option>
                {cities.map((city) => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </CityDropdown>
            </Field>
            <SearchButton type="button" onClick={handleSearchPets}>
              <DogIcon />
              <TextButton>Procurar Pets</TextButton>
            </SearchButton>
          </FieldGroup>
        </Fields>
      </FormContainer>

      <ListUL>
        {pets.map((pet) => (
          <Link to={`/pets/${pet.id}`} key={pet.id}>
            <List>
              <CardPet
                photoUrl={pet.photoUrl}
                name={pet.name}
                gender={pet.gender}
              />
            </List>
          </Link>
        ))}
      </ListUL>
    </Container>
  );
};

export default AdoptPet;

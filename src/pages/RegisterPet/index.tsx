import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import logo from '../../assets/logo.png';

import {
  Container,
  Header,
  Logo,
  BackIcon,
  BackText,
  FormContainer,
  Title,
  Fields,
  InputContainer,
  InputLabel,
  Input,
  FieldGroup,
  Dropdown,
  Legend,
  SubTitle,
  Option,
  Span,
  SubmitButton,
} from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const RegisterPet: React.FC = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [name, setName] = useState('');
  const [sizes] = useState<string[]>(['Pequeno', 'Médio', 'Grande']);
  const [genders] = useState<string[]>(['Macho', 'Fêmea', 'Não sei']);
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

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

  const handleMapClick = (event: LeafletMouseEvent): void => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSize(event.target.value);
  };

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setGender(event.target.value);
  };

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;

    const data = new FormData();

    data.append('name', name);
    data.append('size', size);
    data.append('gender', gender);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    if (selectedFile) {
      data.append('photo', selectedFile);
    }

    await api.post('pets', data);

    alert('Pet cadastrado com sucesso!');

    history.push('/');
  }

  return (
    <Container>
      <Header>
        <BackText to="/">
          <BackIcon />
          Voltar
        </BackText>

        <Logo src={logo} alt="adopet" />
      </Header>

      <FormContainer onSubmit={handleSubmit}>
        <Title>Cadastro do Pet</Title>

        <Dropzone onFileUploaded={setSelectedFile} />

        <Fields>
          <InputContainer>
            <InputLabel htmlFor="name">Nome ( psiu, batisa ele ai )</InputLabel>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleInputChange}
            />
          </InputContainer>

          <FieldGroup>
            <InputContainer>
              <InputLabel htmlFor="size">Qual porte dele?</InputLabel>
              <Dropdown
                name="size"
                id="size"
                value={size}
                onChange={handleSizeChange}
              >
                <Option value="0">Selecione o porte</Option>
                {sizes.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Dropdown>
            </InputContainer>
            <InputContainer>
              <InputLabel htmlFor="gender">Qual o sexo?</InputLabel>
              <Dropdown
                name="gender"
                id="gender"
                value={gender}
                onChange={handleGenderChange}
              >
                <Option value="0">Selecione o sexo</Option>
                {genders.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Dropdown>
            </InputContainer>
          </FieldGroup>
        </Fields>

        <Fields>
          <Legend>
            <SubTitle>Endereço</SubTitle>
          </Legend>
          <FieldGroup>
            <InputContainer>
              <InputLabel htmlFor="uf">Estado (UF)</InputLabel>
              <Dropdown
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <Option value="0">Selecione a sigla do seu Estado</Option>
                {ufs.map((uf) => (
                  <Option key={uf} value={uf}>
                    {uf}
                  </Option>
                ))}
              </Dropdown>
            </InputContainer>
            <InputContainer>
              <InputLabel htmlFor="city">Cidade</InputLabel>
              <Dropdown
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <Option value="0">Selecione a sua Cidade</Option>
                {cities.map((city) => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </Dropdown>
            </InputContainer>
          </FieldGroup>

          <Span>Selecione a região no mapa</Span>
          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
        </Fields>

        <SubmitButton type="submit">Cadastrar Pet</SubmitButton>
      </FormContainer>
    </Container>
  );
};

export default RegisterPet;

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import logo from '../../assets/logo.png';
import './styles.css';

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

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleSizeChange(event: ChangeEvent<HTMLSelectElement>) {
    setSize(event.target.value);
  }

  function handleGenderChange(event: ChangeEvent<HTMLSelectElement>) {
    setGender(event.target.value);
  }

  async function handleSubmit(event: FormEvent) {
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
    <div id="page-register-pet">
      <header>
        <Link to="/">
          <FiArrowLeft />
          Voltar
        </Link>

        <img src={logo} alt="adopet" />
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do Pet</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <div className="field">
            <label htmlFor="name">Nome ( psiu, batisa ele ai )</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="size">Qual porte dele?</label>
              <select
                name="size"
                id="size"
                value={size}
                onChange={handleSizeChange}
              >
                <option value="0">Selecione o porte</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="gender">Qual o sexo?</label>
              <select
                name="gender"
                id="gender"
                value={gender}
                onChange={handleGenderChange}
              >
                <option value="0">Selecione o sexo</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
          </legend>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione a sigla do seu Estado</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Selecione a sua Cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <span>Selecione a região no mapa</span>
          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
        </fieldset>

        <button type="submit">Cadastrar Pet</button>
      </form>
    </div>
  );
};

export default RegisterPet;

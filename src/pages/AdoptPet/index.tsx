import React, { useState, useEffect, ChangeEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FaDog } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import './styles.css';

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
  photo_url: string;
}

const AdoptPet = () => {
  const [pets, setPets] = useState<PetsArray[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    })
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios
    `).then(response => {
      const cityName = response.data.map(city => city.nome);
      setCities(cityName);
    })
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  };

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  async function handleSearchPets() {
    const response = await api.get(`pets?city=${selectedCity}&uf=${selectedUf}`);
    setPets(response.data);
  }

  return (
    <div id="page-adopt-pet">
      <header>
        <Link to="/">
            <FiArrowLeft />
            Voltar
        </Link>

          <img src={logo} alt="adopet" />
      </header>
      <form>
      <fieldset>
          <legend>
            <h2>De onde você é?</h2>
          </legend>
          <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado</label>
                <select 
                  className="uf"
                  name="uf"
                  id="uf"
                  value={selectedUf}
                  onChange={handleSelectUf}
                  >
                  <option value="0">UF</option>
                  {ufs.map(uf => (
                    <option
                    key={uf}
                    value={uf}>
                    {uf}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select
                className="city"
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
                >
                <option value="0">Selecione a sua Cidade</option>
                  {cities.map(city => (
                    <option
                    key={city}
                    value={city}>
                    {city}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={handleSearchPets}>
                <span>
                  <FaDog size={18}/>
                </span>
                Procurar Pets</button>
            </div>
        </fieldset>
      </form>
      

    <ul className="pet-ul">
      {
        pets.map(pet => (
          <Link to={`/pets/${pet.id}`}>
            <li key={pet.id}>
            <div className="pet-card">
              <img src={pet.photo_url} alt="adopet" />
              <h4><b>{pet.name}</b></h4>
              <p>{`${pet.gender} de porte ${pet.size}`}</p>
            </div>
          </li>
          </Link>
        ))
      }
    </ul>
    </div>
  )
}

export default AdoptPet;
import React, {useEffect, useState} from 'react';
import { RouteComponentProps, withRouter, useHistory } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import './styles.css'

interface PropsId {
  id: string;
}

interface PetObject {
  id: number
  created_at: string
  name: string
  photo_url: string
  size: string,
  gender: string,
  latitude: number,
  longitude: number,
  adopted: boolean,
}

type DetailProps = RouteComponentProps<PropsId>;

const PetDetails: React.FC<DetailProps> = ({ match }) => {
  const [petDetails, setPetDetails] = useState<PetObject>
  ({
    id: 0,
    created_at: '',
    name: '',
    photo_url: '',
    size: '',
    gender: '',
    latitude: 0,
    longitude: 0,
    adopted: false,
  });

  const history = useHistory();

  useEffect(() => {
    api.get(`pets/${match.params.id}`).then(response => {
      const data = response.data[0];
      setPetDetails(data);
    })
  },[match.params.id]);


  function handleBack() {
    history.push('/');
  }

  return (
    <>
      {
        petDetails
        ?
        <div id="page-details-pet">
          <header>
            <Link to="/adopt-pet">
              <FiArrowLeft />
               Voltar
            </Link>

            <img src={logo} alt="adopet" />
          </header>
            <div className="view-pet">
              <h2>{`Uau!!! quer dizer...`}</h2>
              <h3>{`Meu nome é ${petDetails.name}, estou a procura de uma familía!`}</h3>              <div>
                <img src={petDetails.photo_url} alt="adopet" />
                <Map center={[petDetails.latitude, petDetails.longitude]} zoom={25} >
                  <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[petDetails.latitude, petDetails.longitude]} />
                </Map>
              </div>
              <span>{`Eu sou ${petDetails.gender} de porte ${petDetails.size}, eu fui visto data tal e horário tal aqui nesse região, vem me procurar? Estou com fome e ansioso pra te conhecer!`}</span>    
            </div>
        </div>
        :
        <div className="page-details-pet">
          <span>404 Dog não encontrado!</span>
          <button type="button" onClick={handleBack}>Voltar</button>
        </div>
      }
    </>
  );
};

export default withRouter(PetDetails);
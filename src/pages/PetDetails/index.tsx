import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter, useHistory } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
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
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
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
      const { created_at } = response.data[0];
      const dateParsedISO = parseISO(created_at);
      const dateFormated =  () => format(dateParsedISO, "d 'de' MMMM 'por volta das' H:m", { locale: pt });
      
      const data = response.data[0];
      setPetDetails(data);
      setDate(dateFormated);
      setLink(`http://localhost:3000/pets/${response.data[0].id}`)
    })
  },[match.params.id]);

  async function handleAdopt() {
    await api.put(`pets/${petDetails.id}`);
    history.push('/thankyou');
  }

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
              <span>{`Eu sou ${petDetails.gender} de porte ${petDetails.size}, fui visto pela última vez aqui nessa região dia ${date} no horário de Brasília, sim, eu sou muito inteligente e entendo de fuso horário!`}</span>
              <b>Vem me procurar? Estou com fome e ansioso pra te conhecer!</b>
              <div className="div-buttons">
                <Link className="adopt-button" to={`#`} onClick={() => {if(window.confirm('Você realmentou adotou? Se você não adotou, ele perderá a chance de ser adotado por outra familía')){ handleAdopt()};}}>
                  <span className="span-button">
                    </span>
                    <strong>Eu adotei</strong>
                </Link>
                <Link className="share-button" to={`#`} onClick={() => {if(window.confirm('Link do Pet copiado, agora é só colar em qualquer rede social, obrigado!')){ navigator.clipboard.writeText(link)};}}>
                  <span className="span-button">
                    </span>
                    <strong>Compartilhar</strong>
                </Link>
              </div>
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
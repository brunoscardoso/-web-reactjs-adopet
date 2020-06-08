import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import crypto from 'crypto';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import homeopatas from '../../assets/logo-homeopatas.png';

import './styles.css';

interface PropsId {
  id: string;
}

interface PetObject {
  id: number
  name: string
  photo_url: string
}

type DetailProps = RouteComponentProps<PropsId>;

const GiftPet: React.FC<DetailProps> = ({ match }) => {
  const [gift, setGift] = useState('');
  const [petDetails, setPetDetails] = useState<PetObject>
  ({
    id: 0,
    name: '',
    photo_url: '',
  });

  useEffect(() => {
    api.get(`pets/${match.params.id}`).then(response => {
      const data = response.data[0];
      setPetDetails(data);

      const { name } = response.data[0];

      const hash = crypto.randomBytes(2).toString('hex');
      const petName = `${name}-${hash}`;

      setGift(petName);
    });

  }, [match.params.id])

  return (
    <div id="page-gift-pet">
      <header>
        <Link to="/">
            <FiArrowLeft />
            Voltar
        </Link>

        <img src={logo} alt="adopet" />
      </header>

      <div>
        <h1>Parabéns!</h1>

        <h3>{`Você ganhou a primeira consulta do(a) ${petDetails.name} de uma Clínica Veterinária que está apoiando a sua atitude!`}</h3>
        
        <img src={homeopatas} alt="homeopatas" />
        <h1>{`Código: ${gift}`}</h1>
        <span>Para receber essa consulta gratuíta você só precisa bater um print ou uma foto desse cupom e levar até a Clínica Veterinária Homeopatas em Navegantes - SC <br /><br/> Seria muito legal se você batesse uma foto com o seu novo amigo marcando @clinicavethomeopatas para incentivarmos outras pessoas!</span>
      </div>
    </div>
  );
}

export default withRouter(GiftPet);
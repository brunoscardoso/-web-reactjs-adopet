import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import homeopatas from '../../assets/voucher-homeopatas.png';

import './styles.css';

interface PropsId {
  id: string;
}

interface PetObject {
  id: number;
  name: string;
  photoUrl: string;
  giftedCode: string;
}

type DetailProps = RouteComponentProps<PropsId>;

const GiftPet: React.FC<DetailProps> = ({ match }) => {
  const [giftCheck, setGiftCheck] = useState({});
  const [gift, setGift] = useState('');
  const [petDetails, setPetDetails] = useState<PetObject>({
    id: 0,
    name: '',
    photoUrl: '',
    giftedCode: '',
  });

  useEffect(() => {
    api
      .put(`thankyou/${match.params.id}`)
      .then((response) => {
        setGift(response.data);
      })
      .catch(() => {
        setGift('Cupom já gerado!');
        setGiftCheck(false);
      });

    api.get(`pets/${match.params.id}`).then((response) => {
      const data = response.data[0];
      setPetDetails(data);
    });
  }, [match.params.id]);

  return (
    <div id="page-gift-pet">
      <header>
        <Link to="/">
          <FiArrowLeft />
          Voltar
        </Link>

        <img src={logo} alt="adopet" />
      </header>

      {giftCheck ? (
        <div className="page-details">
          <h1>Parabéns!</h1>
          <h3>{`Você ganhou a primeira consulta e um banho para(a) ${petDetails.name} de uma Clínica Veterinária que está apoiando a sua atitude!`}</h3>
          <div className="voucher">
            <div className="sidebar">
              <img src={homeopatas} alt="adopet" />
            </div>
            <div className="details">
              <h1>{petDetails.name}</h1>
              <h1>{gift}</h1>
            </div>
            <QRCode value={gift} />
          </div>
          <span>
            Para receber essa consulta gratuíta você só precisa bater um print
            ou uma foto desse cupom e levar até a Clínica Veterinária Homeopatas
            em Navegantes - SC <br />
            <br /> Seria muito legal se você batesse uma foto com o seu novo
            amigo marcando @clinicavethomeopatas para incentivarmos outras
            pessoas!
          </span>
        </div>
      ) : (
        <div className="page-details">
          <h2>Esse pet foi adotado e já recebeu um cupom!</h2>
        </div>
      )}
    </div>
  );
};

export default withRouter(GiftPet);

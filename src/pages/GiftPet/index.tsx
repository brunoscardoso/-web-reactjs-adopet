import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import QRCode from 'qrcode.react';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import homeopatas from '../../assets/voucher-homeopatas.png';

import {
  Container,
  Header,
  BackIcon,
  BackText,
  Logo,
  Title,
  SubTitle,
  ContainerDetails,
  ContainerVoucher,
  VoucherSidebar,
  VoucherDetails,
  VoucherTitle,
  VoucherLogo,
  DetailsText,
} from './styles';

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
    <Container id="page-gift-pet">
      <Header>
        <BackText to="/">
          <BackIcon />
          Voltar
        </BackText>

        <Logo src={logo} alt="adopet" />
      </Header>

      {giftCheck ? (
        <ContainerDetails className="page-details">
          <Title>Parabéns!</Title>
          <SubTitle>{`Você ganhou a primeira consulta e um banho para(a) ${petDetails.name} de uma Clínica Veterinária que está apoiando a sua atitude!`}</SubTitle>
          <ContainerVoucher className="voucher">
            <VoucherSidebar className="sidebar">
              <VoucherLogo src={homeopatas} alt="adopet" />
            </VoucherSidebar>
            <VoucherDetails className="details">
              <VoucherTitle>{petDetails.name}</VoucherTitle>
              <VoucherTitle>{gift}</VoucherTitle>
            </VoucherDetails>
            <QRCode value={gift} />
          </ContainerVoucher>
          <DetailsText>
            Para receber essa consulta gratuíta você só precisa bater um print
            ou uma foto desse cupom e levar até a Clínica Veterinária Homeopatas
            em Navegantes - SC <br />
            <br /> Seria muito legal se você batesse uma foto com o seu novo
            amigo marcando @clinicavethomeopatas para incentivarmos outras
            pessoas!
          </DetailsText>
        </ContainerDetails>
      ) : (
        <Container className="page-details">
          <SubTitle>Esse pet foi adotado e já recebeu um cupom!</SubTitle>
        </Container>
      )}
    </Container>
  );
};

export default withRouter(GiftPet);

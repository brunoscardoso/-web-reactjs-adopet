import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter, useHistory } from 'react-router';

import { Map, TileLayer, Marker } from 'react-leaflet';

// eslint-disable-next-line import/no-duplicates
import pt from 'date-fns/locale/pt';

// eslint-disable-next-line import/no-duplicates
import { parseISO, format } from 'date-fns';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import {
  Container,
  Header,
  BackIcon,
  BackText,
  Logo,
  PetContainer,
  Title,
  SubTitle,
  MidiaContainer,
  PetPhoto,
  Description,
  DescriptionBold,
  ButtonContainer,
  AdoptButton,
  ShareButton,
  TextButton,
  MapContainer,
  TextNotFound,
} from './styles';

interface PropsId {
  id: string;
}

interface PetObject {
  id: number;
  createdAt: string;
  name: string;
  photoUrl: string;
  size: string;
  gender: string;
  latitude: number;
  longitude: number;
  adopted: boolean;
}

type DetailProps = RouteComponentProps<PropsId>;

const DetailsPet: React.FC<DetailProps> = ({ match }) => {
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [petDetails, setPetDetails] = useState<PetObject>({
    id: 0,
    createdAt: '',
    name: '',
    photoUrl: '',
    size: '',
    gender: '',
    latitude: 0,
    longitude: 0,
    adopted: false,
  });

  const history = useHistory();

  useEffect(() => {
    api.get(`pets/${match.params.id}`).then((response) => {
      if (response.data.length > 0) {
        const { createdAt } = response.data[0];
        const dateParsedISO = parseISO(createdAt);

        const dateFormated = (): string =>
          format(dateParsedISO, "d 'de' MMMM 'por volta das' H:m", {
            locale: pt,
          });

        const data = response.data[0];
        setPetDetails(data);
        setDate(dateFormated);
        setLink(`http://localhost:3000/pets/${response.data[0].id}`);
      }
    });
  }, [match.params.id]);

  async function handleAdopt(): Promise<void> {
    history.push(`/thankyou/${petDetails.id}`);
  }

  function handleBack(): void {
    history.push('/');
  }

  return (
    <>
      {petDetails.id > 0 ? (
        <Container>
          <Header>
            <BackText to="/adopt-pet">
              <BackIcon />
              Voltar
            </BackText>

            <Logo src={logo} alt="adopet" />
          </Header>
          <PetContainer>
            <Title>{`Uau!!! quer dizer...`}</Title>
            <SubTitle>{`Meu nome é ${petDetails.name}, estou a procura de uma familía!`}</SubTitle>{' '}
            <MidiaContainer>
              <PetPhoto src={petDetails.photoUrl} alt="adopet" />
              <MapContainer>
                <Map
                  center={[petDetails.latitude, petDetails.longitude]}
                  zoom={25}
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[petDetails.latitude, petDetails.longitude]}
                  />
                </Map>
              </MapContainer>
            </MidiaContainer>
            <Description>{`Eu sou ${petDetails.gender} de porte ${petDetails.size}, fui visto pela última vez aqui nessa região dia ${date} no horário de Brasília, sim, eu sou muito inteligente e entendo de fuso horário!`}</Description>
            <DescriptionBold>
              Vem me procurar? Estou com fome e ansioso pra te conhecer!
            </DescriptionBold>
            <ButtonContainer>
              <AdoptButton
                to={`#`}
                onClick={() => {
                  if (
                    window.confirm(
                      'Você realmentou adotou? Se você não adotou, ele perderá a chance de ser adotado por outra familía',
                    )
                  ) {
                    handleAdopt();
                  }
                }}
              >
                <TextButton>Eu adotei</TextButton>
              </AdoptButton>
              <ShareButton
                to={`#`}
                onClick={() => {
                  if (
                    window.confirm(
                      'Link do Pet copiado, agora é só colar em qualquer rede social, obrigado!',
                    )
                  ) {
                    navigator.clipboard.writeText(link);
                  }
                }}
              >
                <TextButton>Compartilhar</TextButton>
              </ShareButton>
            </ButtonContainer>
          </PetContainer>
        </Container>
      ) : (
        <Container>
          <Header>
            <BackText to="/adopt-pet">
              <BackIcon />
              Voltar
            </BackText>
            <Logo src={logo} alt="adopet" />
          </Header>
          <TextNotFound>404 Dog não encontrado!</TextNotFound>
        </Container>
      )}
    </>
  );
};

export default withRouter(DetailsPet);

import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  max-width: 730px;
  margin: 0 auto;
`;

export const Header = styled.header`
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BackIcon = styled(FiArrowLeft)`
  margin-right: 16px;
  color: var(--primary-color);
`;

export const BackText = styled(Link)`
  color: var(--title-color);
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img``;

export const PetContainer = styled.div`
  display: flex;
  margin-top: 22px;
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;
  padding: 16px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`;

export const Title = styled.h2`
  padding: 5px 0 0 16px;
`;

export const SubTitle = styled.h3`
  padding: 0 0 0 16px;
`;

export const MidiaContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
`;

export const PetPhoto = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 2px;
  margin-right: 1px;
`;

export const MapContainer = styled.div`
  .leaflet-container {
    width: 350px;
    height: 350px;
    margin-left: 1px;
  }
`;

export const Description = styled.span`
  padding: 5px 0 5px 16px;
`;

export const DescriptionBold = styled.b`
  font-size: 16px;
  padding: 0 0 5px 16px;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  margin-top: 16px;
  display: flex;
`;

export const AdoptButton = styled(Link)`
  width: 100%;
  height: 42px;
  display: flex;
  margin-right: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--second-color);
  text-decoration: none;
  overflow: hidden;
  &:hover {
    background: #ff6666;
  }
`;

export const ShareButton = styled(Link)`
  width: 100%;
  height: 42px;
  display: flex;
  margin-left: 4px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  overflow: hidden;
  background: var(--primary-color);
  border-radius: 8px;
  &:hover {
    background: #2fb86e;
  }
`;

export const TextButton = styled.strong`
  flex: 1;
  text-align: center;
  color: #fff;
`;

export const TextNotFound = styled.h1`
  flex: 1;
  display: flex;
  margin-top: 120px;
  justify-content: center;
`;

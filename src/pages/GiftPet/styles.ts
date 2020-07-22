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

export const ContainerDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px auto;
  padding: 16px;
  max-width: 730px;
  background: #fff;
  border-radius: 8px;
`;

export const ContainerVoucher = styled.div`
  display: flex;
  height: 200px;
  width: 500px;
  margin: 32px 0 32px 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  border-style: solid;
  border-color: #000;
  border-radius: 8px;
`;

export const VoucherSidebar = styled.div`
  display: flex;
  width: 80px;
  height: 200px;
  align-items: center;
  justify-content: center;
  border-radius: 8px 0 0 8px;
  border-top: solid;
  border-bottom: solid;
  border-color: #000;
  background: #f0f0f5;
`;

export const VoucherDetails = styled.div`
  display: flex;
  margin: 0 24px 0 24px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px 0 0 8px;
`;

export const Title = styled.h1`
  margin: 24px 0 16px 0;
  font-size: 50px;
`;

export const SubTitle = styled.h3`
  text-align: center;
  color: #000;
`;

export const VoucherTitle = styled.h1`
  color: #000;
  font-size: 40px;
`;

export const DetailsText = styled.span`
  text-align: center;
  margin-bottom: 24px;
`;

export const VoucherLogo = styled.img`
  width: 70px;
  height: 170px;
`;

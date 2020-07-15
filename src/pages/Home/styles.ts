import styled from 'styled-components';
import { IoIosHeart } from 'react-icons/io';
import { FaDog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import imgBackground from '../../assets/home-background.png';

export const Container = styled.div`
  height: 100vh;
  background: url(${imgBackground}) no-repeat 700px bottom;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Header = styled.header`
  margin: 52px 0 0;
`;

export const Logo = styled.img``;

export const MainContainer = styled.main`
  flex: 1;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TitleText = styled.h1`
  font-size: 54px;
  color: var(--title-color);
`;

export const DescriptionText = styled.p`
  font-size: 24px;
  margin-top: 24px;
  line-height: 38px;
`;

export const AdoptButton = styled(Link)`
  width: 100%;
  max-width: 300px;
  height: 52px;
  background-color: #f24e4e;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 40px;
  &:hover {
    background: #ff6666;
  }
`;

export const RegisterButton = styled(Link)`
  width: 100%;
  max-width: 300px;
  height: 52px;
  background-color: #34cb79;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 10px;
  &:hover {
    background: #2fb86e;
  }
`;

export const IconContainer = styled.div`
  display: block;
  background: rgba(0, 0, 0, 0.08);
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
`;

export const HeartIcon = styled(IoIosHeart)`
  color: #fff;
  width: 20px;
  height: 20px;
`;

export const DogIcon = styled(FaDog)`
  color: #fff;
  width: 20px;
  height: 20px;
`;

export const TextButon = styled.strong`
  flex: 1;
  margin-left: 18px;
  color: #fff;
`;

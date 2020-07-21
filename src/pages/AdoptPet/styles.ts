import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { FaDog } from 'react-icons/fa';
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

export const FormContainer = styled.form`
  margin: 40px 0 20px 0;
  padding: 44px;
  max-width: 730px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

export const Fields = styled.fieldset`
  min-inline-size: auto;
  border: 0;
`;

export const Title = styled.h1`
  font-size: 26px;
`;

export const FieldGroup = styled.div`
  flex: 1;
  display: flex;
  margin-top: 8px;
`;

export const Field = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const LabelText = styled.label``;

export const Option = styled.option``;

export const UFDropdown = styled.select`
  width: 80px;
  height: 45px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f0f0f5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 14px;
  color: #6c6c80;
  margin-left: 8px;
`;

export const CityDropdown = styled.select`
  width: 200px;
  height: 45px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f0f0f5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 14px;
  color: #6c6c80;
  margin-left: 8px;
  margin-right: 25px;
`;

export const SearchButton = styled.button`
  width: 200px;
  height: 50px;
  background: var(--primary-color);
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-start;
  transition: background-color 0.2s;
  cursor: pointer;
  &:hover {
    background: #2fb86e;
  }
`;

export const TextButton = styled.strong`
  flex: 1;
  margin-left: 18px;
  color: #fff;
`;

export const DogIcon = styled(FaDog)``;

export const ListUL = styled.ul`
  list-style-type: none;
`;

export const List = styled.li``;

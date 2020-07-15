import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  max-width: 730px;
  margin: 0 auto;
`;

export const Header = styled.div`
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
  margin: 40px auto;
  padding: 44px;
  max-width: 730px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  & .leaflet-container {
    width: 100%;
    height: 350px;
    border-radius: 8px;
    margin-bottom: 24px;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
`;

export const Fields = styled.fieldset`
  margin-top: 16px;
  min-inline-size: auto;
  border: 0;
`;

export const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-right: 10px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  flex: 1;
  background: #f0f0f5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: #6c6c80;
`;

export const FieldsGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`;

export const Dropdown = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  flex: 1;
  background: #f0f0f5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: #6c6c80;
`;

export const Legend = styled.legend`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const SubTitle = styled.h2`
  font-size: 24px;
`;

export const Option = styled.option``;

export const Span = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: var(--text-color);
`;

export const SubmitButton = styled.button`
  width: 260px;
  height: 56px;
  background: var(--primary-color);
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-start;
  margin-top: 20px;
  transition: background-color 0.2s;
  cursor: pointer;
  &:hover {
    background: #2fb86e;
  }
`;

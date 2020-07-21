import styled from 'styled-components';

export const Container = styled.div`
  float: left;
  width: 174.5px;
  height: 230px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin: 0 8px 0 0px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const Photo = styled.img`
  width: 174.5px;
  height: 180px;
  border-radius: 5px 5px 0 0;
`;

export const Title = styled.h4`
  font-size: 16px;
  margin-left: 8px;
`;

export const Description = styled.p`
  font-size: 14px;
  margin-left: 8px;
`;

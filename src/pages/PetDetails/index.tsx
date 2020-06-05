import React, {useEffect, useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import api from '../../services/api';

interface PropsId {
  id: string;
}

type DetailProps = RouteComponentProps<PropsId>;

const PetDetails: React.FC<DetailProps> = ({ match }) => {
  const [petDetail, setPetDetail] = useState();

  useEffect(() => {
    api.get(`pets/${match.params.id}`).then(response => {
      
      const data = response.data;

      setPetDetail(data[0]);

      console.log(petDetail)
    });
  },[]);

 return (
  <h1>Details</h1>
 )
};

export default withRouter(PetDetails);
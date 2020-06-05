import React, {useEffect, useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import api from '../../services/api';

interface PetsArray {
  id: string;
  name: string;
  size: string;
  gender: string;
  photo_url: string;
}

type PetDetailProps = RouteComponentProps<PetsArray>;

const PetDetails: React.FC<PetDetailProps> = ({ match }) => {
  const [petDetais, setPetDetails] = useState<PetsArray[]>([]);

  useEffect(() => {
    api.get<PetsArray>(`pets/${match.params.id}`).then(response => {
      setPetDetails([response.data])
    })
  },[]);

  return (
    <div>
      {petDetais.map(pet => (
        <div key={pet.id}> 
          <h1>{pet.name}</h1>
          <img src="https://www.hypeness.com.br/wp-content/uploads/2019/09/Vira-lata_Caramelo_3.jpg" alt="caramelo" />
        </div>
      ))}
    </div>
  )
};

export default withRouter(PetDetails);
import React from 'react';
import { IoIosHeart } from 'react-icons/io';
import { FaDog } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.png';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="AdoPet" />
        </header>

        <main>
          <h1>Você quer adotar ou cadastrar um novo Pet?</h1>
          <p>Nós ajudamos a dar um novo lar <br/> para os caramelos!</p>

          <Link to="/adopt-pet" id="button-adoption">
            <span>
              <IoIosHeart />
            </span>
            <strong>Adotar</strong>
          </Link>

          <Link to="/register-pet">
            <span>
              <FaDog />
            </span>
            <strong>Cadastrar</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Home;
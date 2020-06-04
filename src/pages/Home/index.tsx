import React from 'react';
import { IoIosHeart } from 'react-icons/io'
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
          <h1>Quer adotar um Pet ou cadastrar um novo para adocão?</h1>
          <p>Ajudamos os dogs caramelos a encontrarem um novo lar</p>

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
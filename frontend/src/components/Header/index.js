import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { singOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';
import logo from '~/assets/logo-header.svg';

export default function Header() {
  const dispatch = useDispatch();
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/student">
            <img src={logo} alt="gympointer" />
          </Link>
          <NavLink to="/student" activeClassName="selected">
            Estudante
          </NavLink>
          <NavLink to="/registration" activeClassName="selected">
            Matricula
          </NavLink>
          <NavLink to="/plan" activeClassName="selected">
            Planos
          </NavLink>
          <NavLink to="/help" activeClassName="selected">
            Ajuda
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <strong>Walafi Ferreira</strong>
            <button type="button" onClick={() => dispatch(singOut())}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

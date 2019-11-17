import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { singOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';
import logo from '~/assets/logo-header.svg';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/student">
            <img src={logo} alt="gympointer" />
          </Link>
          <NavLink to="/student" activeClassName="selected">
            ALUNOS
          </NavLink>
          <NavLink to="/registration" activeClassName="selected">
            Matricula
          </NavLink>
          <NavLink to="/plan" activeClassName="selected">
            Planos
          </NavLink>
          <NavLink to="/help" activeClassName="selected">
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <strong title={`${user.name} - ${user.email}`}>{user.name}</strong>
            <button type="button" onClick={() => dispatch(singOut())}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

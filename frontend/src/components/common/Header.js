import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #222;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

export function Header() {
    return (
        <HeaderWrapper>
            <div><strong>Cafeteria CodeQual</strong></div>
            <nav><NavLink href="#contato">Contato</NavLink></nav>
        </HeaderWrapper>
    );
}
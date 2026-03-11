import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  margin-top: 60px;
  text-align: center;
  color: #777;
  font-size: 0.9rem;
`;

export function Footer() {
    return <FooterWrapper>SENAI Soluções Digitais</FooterWrapper>;
}
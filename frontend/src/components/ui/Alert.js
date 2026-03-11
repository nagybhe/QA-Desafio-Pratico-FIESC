import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  animation: ${slideIn} 0.3s ease-out;
`;

const AlertBox = styled.div`
  background: ${({ type }) => {
    switch(type) {
      case 'success': return '#d4edda';
      case 'error': return '#f8d7da';
      case 'warning': return '#fff3cd';
      default: return '#fff';
    }
  }};
  color: ${({ type }) => {
    switch(type) {
      case 'success': return '#155724';
      case 'error': return '#721c24';
      case 'warning': return '#856404';
      default: return '#222';
    }
  }};
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  max-width: 400px;
  border: 1px solid ${({ type }) => {
    switch(type) {
      case 'success': return '#c3e6cb';
      case 'error': return '#f5c6cb';
      case 'warning': return '#ffeeba';
      default: return '#ddd';
    }
  }};
`;

const AlertMessage = styled.p`
  margin: 0;
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 20px;
  padding: 0 4px;
  opacity: 0.5;
  line-height: 1;
  
  &:hover {
    opacity: 1;
  }
`;

export function Alert({ visible, message, type = 'error', onClose }) {
    if (!visible) return null;

    return (
        <AlertContainer>
            <AlertBox type={type}>
                <AlertMessage>{message}</AlertMessage>
                <CloseButton onClick={onClose}>×</CloseButton>
            </AlertBox>
        </AlertContainer>
    );
}
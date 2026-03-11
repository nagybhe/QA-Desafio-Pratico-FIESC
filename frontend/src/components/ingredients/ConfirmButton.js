import styled from 'styled-components';

export const ConfirmButton = styled.button`
  margin-top: 15px;
  padding: 10px 24px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  width: 100%;
  font-size: 1rem;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #222;
  }
`;
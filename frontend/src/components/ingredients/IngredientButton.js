import styled from 'styled-components';

export const IngredientButton = styled.button`
  padding: 6px 14px;
  font-size: 0.9rem;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#222')};
  border: 1.5px solid #222;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: 0.25s;
  &:hover {
    background-color: ${({ selected }) => (selected ? '#111' : '#eee')};
  }
`;
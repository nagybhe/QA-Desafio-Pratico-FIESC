import React from 'react';
import styled from 'styled-components';

const SmallCard = styled.div`
  background: #fff;
  border: 1.5px solid #ccc;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.08);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: ${({ clickable }) =>
        clickable ? '0 6px 20px rgba(0,0,0,0.15)' : '0 2px 5px rgb(0 0 0 / 0.08)'};
  }
`;

const CardImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export function SummaryCard({ image, title, children, clickable, onClick }) {
    return (
        <SmallCard clickable={clickable} onClick={onClick}>
            <CardImage src={image} alt={title} />
            <CardText>
                <strong>{title}</strong>
                <p style={{ margin: 0 }}>{children}</p>
            </CardText>
        </SmallCard>
    );
}
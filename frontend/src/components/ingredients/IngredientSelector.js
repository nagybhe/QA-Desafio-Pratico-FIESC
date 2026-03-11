import React from 'react';
import styled from 'styled-components';
import { IngredientButton } from './IngredientButton';
import { ConfirmButton } from './ConfirmButton';

const SelectorBox = styled.div`
  flex: 1;
  min-width: 280px;
`;

const SelectorTitle = styled.h3`
  margin-bottom: 12px;
  text-align: left;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
`;

export function IngredientSelector({ 
    title, 
    ingredientes, 
    selecionados, 
    toggle, 
    confirmLabel, 
    onConfirm, 
    confirmDisabled 
}) {
    return (
        <SelectorBox>
            <SelectorTitle>{title}</SelectorTitle>
            <ButtonGroup>
                {ingredientes.map(item => (
                    <IngredientButton
                        key={item}
                        selected={selecionados.includes(item)}
                        onClick={() => toggle(item)}
                        type="button"
                    >
                        {item}
                    </IngredientButton>
                ))}
            </ButtonGroup>
            {onConfirm && (
                <ConfirmButton onClick={onConfirm} disabled={confirmDisabled} type="button">
                    {confirmLabel}
                </ConfirmButton>
            )}
        </SelectorBox>
    );
}
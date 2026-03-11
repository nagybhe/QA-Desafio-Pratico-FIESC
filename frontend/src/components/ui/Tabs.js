import React, { useState } from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  gap: 10px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 12px 24px;
  background: ${({ active }) => (active ? '#000' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: -2px;
  
  &:hover {
    background: ${({ active }) => (active ? '#000' : '#f0f0f0')};
  }
  
  ${({ active }) => active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #000;
    }
  `}
`;

const TabContent = styled.div`
  padding: 20px 0;
  min-height: 400px;
`;

export function Tabs({ tabs, defaultTab = 0 }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <TabsContainer>
            <TabsHeader>
                {tabs.map((tab, index) => (
                    <TabButton
                        key={index}
                        active={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </TabButton>
                ))}
            </TabsHeader>
            <TabContent>
                {tabs[activeTab]?.content}
            </TabContent>
        </TabsContainer>
    );
}
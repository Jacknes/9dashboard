import React from 'react';
import styled from '../styled-components';
import Header from './Header';

const Layout: React.FC = ({ children, onDarkModeClick }) => {
    return (
        <Root>
            <Header onDarkModeClick={onDarkModeClick} />
            {children}
        </Root>
    );
};

const Root = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
`;

export default Layout;

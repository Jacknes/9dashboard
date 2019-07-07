import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../press-ui/Logo';
import Icon from '../press-ui/Icon';
import styled from '../styled-components';

const Header = ({ onDarkModeClick }) => {
    return (
        <Root>
            <NineLink to="/">
                {/* <Logo size={24} /> */}
                <Icon type="nineDots" size={36} />
                <SearchRoot>
                    <Icon type="search" size={24} />
                    <Search placeholder="Search anything" />
                </SearchRoot>
                <div onClick={onDarkModeClick}>
                    <Icon type="eye" />
                </div>
                {/* <button
                    onClick={e => {
                        e.preventDefault();
                        onDarkModeClick('light');
                    }}
                >
                    light mode
                </button>
                <button
                    onClick={e => {
                        e.preventDefault();
                        onDarkModeClick('dark');
                    }}
                >
                    dark mode
                </button>
                <button
                    onClick={e => {
                        e.preventDefault();
                        onDarkModeClick('banana');
                    }}
                >
                    banana mode
                </button> */}
            </NineLink>
        </Root>
    );
};

const Root = styled.div`
    border-bottom: 1px solid ${p => p.theme.colors.textDefault};
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 24px;
`;

const NineLink = styled(Link)`
    display: flex;
    width: 100%;
    padding: 4px 0px;
    color: ${p => p.theme.colors.active};
    text-decoration: none;
    color: ${p => p.theme.colors.textDefault};
    align-items: center;
`;

const Search = styled.input`
    border: none;
    margin-left: 8px;
    font-size: 14px;
    height: 100%;
    width: 100%;
    outline: none;
`;

const SearchRoot = styled.div`
    margin-left: 48px;
    display: flex;
    flex: 1;
    align-items: center;

    input {
        background: ${p => p.theme.colors.bgDefault};
    }
`;

export default Header;

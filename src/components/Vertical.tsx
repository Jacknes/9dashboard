import React from 'react';
import styled from '../styled-components';
import SiteIcon from './SiteIcon';

type Props = {
    value: string;
    name: string;
    selected: boolean;
    collapsed: boolean;
    onClick(vertical: string): any;
};

const Vertical = (props: Props) => {
    const { name, value, selected, collapsed, onClick } = props;
    const handleOnClick = () => {
        onClick(value);
    };

    return (
        <Root onClick={handleOnClick} selected={selected}>
            <SiteIconStyled site={value} />
            {!collapsed && <Name>{name}</Name>}
        </Root>
    );
};

type RootProps = { selected: boolean };
const Root = styled.div<RootProps>`
    display: flex;
    align-items: center;
    background-color: ${p => (p.selected ? p.theme.colors.grey2 : p.theme.colors.bgDefault)};
    user-select: none;
    height: 64px;
    padding: 0 0 0 24px;
    cursor: pointer;
    :hover {
        background-color: ${p => p.theme.colors.grey1};
    }
`;

const Name = styled.span`
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    line-height: ${p => p.theme.type.bodySmall.lineHeight}px;
    margin-left: 16px;
`;

const SiteIconStyled = styled(SiteIcon)`
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
`;

export default Vertical;

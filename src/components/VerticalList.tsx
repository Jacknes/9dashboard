import React from 'react';
import styled from '../styled-components';
import Vertical from './Vertical';
import Icon from '../press-ui/Icon';

type Props = {
    data: [];
    collapsed: boolean;
    site: string;
    verticals: [];
    setSite(vertical: string): any;
};

const VerticalList = (props: Props) => {
    const { data, collapsed, site, setSite, verticals } = props;
    const handleOnClick = (vertical: string) => {
        setSite(vertical);
    };
    return (
        <Root>
            {verticals.map(vertical => {
                const { name, value } = vertical;
                return (
                    <Vertical
                        key={value}
                        value={value}
                        name={name}
                        collapsed={collapsed}
                        selected={value === site}
                        onClick={handleOnClick}
                    />
                );
            })}
            <CollapseIcon type="backTo" />
        </Root>
    );
};

const Root = styled.div`
    display: flex;
    flex: 0;
    z-index: 1;
    background-color: ${p => p.theme.colors.bgDefault};
    flex-direction: column;
    flex: 0 0 260px;
    border-right: 1px solid ${p => p.theme.colors.border};
    padding: 12px 0;
`;

const CollapseIcon = styled(Icon)`
    position: absolute;
    bottom: 10px;
    left: 220px;
    color: ${p => p.theme.colors.grey3};
`;

export default VerticalList;

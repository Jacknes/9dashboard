import React from 'react';
import styled from '../styled-components';

const StoryFilter = () => {
    return (
        <Root>
            <Option selected>Most Recent</Option>
            <Option>Most Read</Option>
        </Root>
    );
};

const Root = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #333333;
`;

type OptionProps = { selected: boolean };
const Option = styled.div<OptionProps>`
    display: flex;
    flex: 0 0 50%;
    flex-direction: column;
    height: 63px;
    font-weight: 600;
    text-align: center;
    justify-content: center;
    border-bottom: ${p => (p.selected ? '1px solid #333333' : 'none')};
    user-select: none;
    cursor: pointer;
    :hover {
        background-color: ${p => p.theme.colors.grey1};
    }
`;

export default StoryFilter;
